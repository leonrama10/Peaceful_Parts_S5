package com.service;

import org.springframework.stereotype.Service;

import com.entity.TherapistTools;
import com.repository.TherapistToolsRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TherapistToolsService {

    private final TherapistToolsRepository therapistToolsRepository;

    public TherapistToolsService(TherapistToolsRepository therapistToolsRepository) {
        this.therapistToolsRepository = therapistToolsRepository;
    }

    public List<TherapistTools> getAllAppointments() {
        return therapistToolsRepository.findAll();
    }

    public TherapistTools createAppointment(String therapistId, LocalDateTime appointmentTime) {
        TherapistTools appointment = new TherapistTools(therapistId, appointmentTime);
        return therapistToolsRepository.save(appointment);
    }
}