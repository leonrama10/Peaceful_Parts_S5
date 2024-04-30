import React from 'react';

export default function Home(){
    return (
            <main>
            <style>
              {`
                main{
                height: 433px;
                }

                .p2-home{
                    width: 300px;
                    font-size: 16px;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
                
                .h2-home{
                    width: 350px;
                    position: absolute;
                    top: 35%;
                    left: 50%;
                    transform: none;
                    margin-top: 10px;
                    transform: translate(-50%, -50%);
                }

              `}
            </style>

            <h2 className="h2-home">Get matched to the best therapist for you</h2>
            <p className="p2-home">Answer a few questions to find a credentialled therapist
            who fits your needs and preferences. Tap into the largest
            network of credentialled providers.
            </p>

                <div className="container">
                </div>
            </main>
    );
}