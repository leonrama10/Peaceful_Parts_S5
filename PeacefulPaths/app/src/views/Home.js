import React from 'react';

import '../css/Home.css';

import FAQ from './FAQ';

export default function Home(){
    return (
         <main className="Main-home">
            <div className="Home-div-kryesor">
                        <div className="title-home">
                          <h1 className="title-1">You deserve to be happy.</h1>
                          <p className="title-2">What type of therapy are you looking for?</p>
                        </div>

                        <div className="Container-home">
                           <div className="box1">
                             <h4 className="box1-h4">Individual</h4>
                             <a className="box1-a1" href="/get-started">For mySelf →</a>
                           </div>

                           <div className="box2">
                             <h4 className="box1-h4">Couples</h4>
                             <a className="box1-a1" href="/get-started">For me and my partner →</a>
                           </div>

                           <div className="box3">
                             <h4 className="box1-h4">Teen</h4>
                             <a className="box1-a1" href="/get-started">For my child →</a>
                           </div>
                       </div>
            </div>


            <div className="part-two-main">
                <div className="part-two-Container">
                  <h1 className="pt-title-1">The world's largest <br/> therapy service.</h1>
                  <h1 className="pt-title-2">100% online.</h1>
                </div>

                <div className="part-two-main-right">
                  <h1 className="pt-title-3">380,418,761</h1>
                  <p className="pt-paragraf-1">Messages, chat, phone, video sessions</p>
                  <hr/>

                  <h1 className="pt-title-3">35,803</h1>
                  <p className="pt-paragraf-1">Messages, chat, phone, video sessions</p>
                  <hr/>

                  <h1 className="pt-title-3">4,747,193</h1>
                  <p className="pt-paragraf-1">Messages, chat, phone, video sessions</p>
                  <hr/>
                </div>
            </div>


            <div className="part-three-main">
              <div className="part-three-Container">
                <h1 className="pth-title-3">Professional and <br/>credentialled therapists <br/>who you can trust</h1>
                <p className="pth-paragraf-3">Tap into the world's largest network of credentialled and <br/>
                  experienced therapists who can help you with a range of <br/>
                  issues including depression, anxiety, relationships, <br/>
                  trauma, grief, and more. With our therapists, you get the <br/>
                  same professionalism and quality you would expect from <br/>
                  an in-office therapist, but with the ability to <br/>
                  communicate when and how you want.
              </p>
              </div>

              <div className="part-three-main-right">
              <a className="pth-button-a1" href="/get-started">Get matched to a therapist</a>
              </div>
            </div>



            <div className="part-four-main">
                <div className="part-four-Container">
                   <h1> <span className="pf-span-4">Peaceful</span> <span className="pf-span-5">Parts vs. traditional in-office therapy</span></h1>
                       <table className="comparison-table">
                           <thead>
                               <tr>
                                   <th></th>
                                   <th className="pf-Peaceful-Parts">Peaceful Parts</th>
                                   <th>In-office</th>
                               </tr>
                           </thead>
                           <tbody>
                               <tr>
                                   <td>Provided by a credentialled therapist <span class="tooltip">i<span className="tooltiptext">All therapists are licensed.</span></span></td>
                                   <td className="pf-td-2"><span className="checkmark">&#10003;</span></td>
                                   <td><span className="checkmark">&#10003;</span></td>
                               </tr>
                               <tr>
                                   <td>In-office visits <span className="tooltip">i<span className="tooltiptext">In-office visits available.</span></span></td>
                                   <td className="pf-td-2"><span className="cross">✖</span></td>
                                   <td><span className="checkmark">&#10003;</span></td>
                               </tr>
                               <tr>
                                   <td>Messaging any time <span className="tooltip">i<span className="tooltiptext">Message your therapist at any time.</span></span></td>
                                   <td className="pf-td-2"><span className="checkmark">&#10003;</span></td>
                                   <td><span className="cross">✖</span></td>
                               </tr>
                               <tr>
                                   <td>Chat sessions <span className="tooltip">i<span className="tooltiptext">Live chat sessions available.</span></span></td>
                                   <td className="pf-td-2"><span className="checkmark">&#10003;</span></td>
                                   <td><span className="cross">✖</span></td>
                               </tr>
                               <tr>
                                   <td>Phone sessions <span className="tooltip">i<span className="tooltiptext">Phone sessions available.</span></span></td>
                                   <td className="pf-td-2"><span className="checkmark">&#10003;</span></td>
                                   <td><span className="cross">✖</span></td>
                               </tr>
                               <tr>
                                   <td>Video sessions <span className="tooltip">i<span className="tooltiptext">Video sessions available.</span></span></td>
                                   <td className="pf-td-2"><span className="checkmark">&#10003;</span></td>
                                   <td><span className="cross">✖</span></td>
                               </tr>
                               <tr>
                                   <td>Easy scheduling <span className="tooltip">i<span className="tooltiptext">Easy to schedule appointments.</span></span></td>
                                   <td className="pf-td-2"><span className="checkmark">&#10003;</span></td>
                                   <td><span className="cross">✖</span></td>
                               </tr>
                               <tr>
                                   <td>Digital worksheets <span className="tooltip">i<span className="tooltiptext">Access to digital worksheets.</span></span></td>
                                   <td className="pf-td-2"><span className="checkmark">&#10003;</span></td>
                                   <td><span className="cross">✖</span></td>
                               </tr>
                               <tr>
                                   <td>Group sessions <span className="tooltip">i<span className="tooltiptext">Group therapy sessions available.</span></span></td>
                                   <td className="pf-td-2"><span className="checkmark">&#10003;</span></td>
                                   <td><span className="info">?</span></td>
                               </tr>
                               <tr>
                                   <td>Smart provider matching <span className="tooltip">i<span className="tooltiptext">Smart matching with the best therapist for you.</span></span></td>
                                   <td className="pf-td-2"><span className="checkmark">&#10003;</span></td>
                                   <td><span className="cross">✖</span></td>
                               </tr>
                               <tr>
                                   <td>Easy to switch providers <span className="tooltip">i<span className="tooltiptext">Easily switch therapists if needed.</span></span></td>
                                   <td className="pf-td-2"><span className="checkmark">&#10003;</span></td>
                                   <td><span className="cross">✖</span></td>
                               </tr>
                               <tr>
                                   <td>Access therapy from anywhere <span className="tooltip">i<span className="tooltiptext">Access your therapy sessions from anywhere.</span></span></td>
                                   <td className="pf-td-2"><span className="checkmark">&#10003;</span></td>
                                   <td><span className="cross">✖</span></td>
                               </tr>
                           </tbody>
                       </table>
                </div>
            </div>


            <FAQ />


         </main>
    );
}