package com.brogramer.peacefulPaths.controller;

import com.brogramer.peacefulPaths.entity.Therapist;
import com.brogramer.peacefulPaths.service.RoleServiceImpl;
import com.brogramer.peacefulPaths.service.TherapistService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@SessionAttributes("therapistShared")
@RequestMapping("/peacefulPaths")
public class TherapistController {
     boolean isLoggedIn = false;

    private TherapistService therapistService;

    @Autowired
    public TherapistController(TherapistService therapistService) {
        this.therapistService = therapistService;
    }

    @GetMapping("/home")
    public String home(@ModelAttribute("therapist") Therapist therapist, Model model,HttpSession session) throws Exception {

        if (session.getAttribute("success") !=null && (boolean) session.getAttribute("success")) {
            isLoggedIn = true;
            model.addAttribute("isLoggedIn", isLoggedIn);

            String email = (String) session.getAttribute("email");

            List<String> roles = therapistService.findByRole(email);

            model.addAttribute("therapist", therapist);
        }else {
            isLoggedIn = false;
            model.addAttribute("isLoggedIn", isLoggedIn);
        }

        return "peacefulPaths/home";
    }

    @GetMapping("/login")
    public String login(@ModelAttribute("therapist") Therapist therapist,Model model,HttpSession session){

        if (session.getAttribute("error") !=null){
            model.addAttribute("error", "Invalid credentials!");
        }

        model.addAttribute("therapist",therapist);

        return "peacefulPaths/login";
    }

    @GetMapping ("/register")
    public String register(Model model){

        Therapist therapist = new Therapist();

        model.addAttribute("therapist",therapist);

        return "peacefulPaths/register";
    }

    @PostMapping("/register")
    public String registerForm(@Valid @ModelAttribute("therapist")  Therapist therapist, BindingResult bindingResult){

        Optional<Therapist> optionalTherapist = therapistService.findByEmail(therapist.getEmail());

        if(bindingResult.hasErrors()){
            return "peacefulPaths/register";
        } else if (optionalTherapist.isPresent()) {
            bindingResult.rejectValue("email", "email.exists", "Email exists");
            return "peacefulPaths/register";
        }
        else if (!therapist.getPassword().equals(therapist.getConfirmPassword())) {
                bindingResult.rejectValue("confirmPassword", "password.mismatch", "Passwords do not match");
                return "peacefulPaths/register";
        }else {

            String hashedPassword = BCrypt.hashpw(therapist.getPassword(), BCrypt.gensalt());
            therapist.setPassword(hashedPassword);

            therapistService.save(therapist);

            return "/peacefulPaths/login";
        }
    }

    @GetMapping ("/forgotPassword")
    public String forgotPassword(Therapist therapist, Model model){

        model.addAttribute("therapistShared",therapist);

        return "peacefulPaths/forgotPassword";
    }


    @PostMapping ("/sendEmail")
    public String sendEmail(@ModelAttribute("therapistShared")Therapist therapist,Model model) throws MessagingException {

        Optional<Therapist> theTherapist = therapistService.findByEmail(therapist.getEmail());

        if (theTherapist.isPresent()) {
            therapist = theTherapist.get();
            therapistService.sendEmail(therapist);
        }else {
            model.addAttribute("error","Invalid email!");
            return "peacefulPaths/forgotPassword";
        }

        model.addAttribute("therapistShared",therapist);

        return "peacefulPaths/verifyPassInfo";
    }

    @GetMapping ("/resetPassword")
    public String resetPassword(@ModelAttribute("therapistShared")Therapist therapist,Model model, @RequestParam(name = "token", required = false) String resetToken) {

        if (therapist != null) {
            if (therapist.getResetToken().equals(resetToken) && System.currentTimeMillis() < therapist.getExpirationTime()) {
                    model.addAttribute("therapistShared", therapist);
                    return "peacefulPaths/resetPassword";
            }
        }

        return "peacefulPaths/resetPasswordFail";
    }

    @PostMapping ("/resetPassword")
    public String updatePassword(@Valid @ModelAttribute("therapistShared")Therapist therapist, BindingResult bindingResult,Model model){

        if(bindingResult.hasErrors()){
//            System.out.println("Validation errors: " + bindingResult.getAllErrors());
            model.addAttribute("error", "Invalid password!");
            return "peacefulPaths/resetPassword";
        }else if (!therapist.getPassword().equals(therapist.getConfirmPassword())) {
            model.addAttribute("error", "Passwords do not match!");
//            bindingResult.rejectValue("confirmPassword", "password.mismatch", "Passwords do not match");
            return "peacefulPaths/resetPassword";
        }

        Optional<Therapist> therapistOptional = therapistService.findByEmail(therapist.getEmail());

        boolean passwordMatch = BCrypt.checkpw(therapist.getPassword(), therapistOptional.get().getPassword());

        if(passwordMatch){
            model.addAttribute("error", "New password can't be like old password!");
            return "peacefulPaths/resetPassword";
        }
            String hashedPassword = BCrypt.hashpw(therapist.getPassword().trim(), BCrypt.gensalt());
            therapistOptional.get().setPassword(hashedPassword);
            therapistOptional.get().setConfirmPassword(hashedPassword);

            therapistService.save(therapistOptional.get());

            return "/peacefulPaths/login";

    }

    @GetMapping("/users")
    public String manageUsers(Model model){

        List<Therapist> therapists = therapistService.findAll();

        model.addAttribute("therapists", therapists);

        return "peacefulPaths/users";
    }

    @GetMapping("/showFormForUpdate")
    public String showFormForUpdate(@RequestParam("id") int theId, Model theModel) {

        Therapist therapist = therapistService.findById(theId);

        theModel.addAttribute("therapist", therapist);

        return "peacefulPaths/showFormForUpdate";
    }

    @PostMapping("/update")
    public String updateTherapist(@Valid @ModelAttribute("therapist") Therapist therapist, BindingResult bindingResult) {

        if(bindingResult.hasErrors()){
            return "peacefulPaths/showFormForUpdate";
        }else {
            Optional<Therapist> optionalTherapist = therapistService.findByEmail(therapist.getEmail());

            Therapist existingTherapist = optionalTherapist.get();

            BeanUtils.copyProperties(therapist, existingTherapist, "id", "confirmPassword","password", "otherFieldsToExclude");

            therapistService.save(existingTherapist);

            return "redirect:/peacefulPaths/users";
        }
    }

    @GetMapping("/account")
    public String showAccount(@ModelAttribute("therapist") Therapist therapist, Model model,HttpSession session) throws Exception {

        if (session.getAttribute("success") !=null && (boolean) session.getAttribute("success")) {
            isLoggedIn = true;

            String email = (String) session.getAttribute("email");

            Optional<Therapist> optionalTherapist = therapistService.findByEmail(email);

            therapist = optionalTherapist.get();

            model.addAttribute("isLoggedIn", isLoggedIn);
            model.addAttribute("therapist", therapist);
        }else {
            model.addAttribute("isLoggedIn", isLoggedIn);
            return "redirect:peacefulPaths/home";
        }

        return "peacefulPaths/account";
    }

    @GetMapping("/delete")
    public String delete(@RequestParam("id") int theId) {

        // delete the employee
        therapistService.deleteById(theId);

        // redirect to /employees/list
        return "redirect:/peacefulPaths/users";
    }

    @GetMapping("/getStarted")
    public String getStarted(){

//        model.addAttribute("therapists", therapists);

        return "peacefulPaths/getStarted";
    }

}
