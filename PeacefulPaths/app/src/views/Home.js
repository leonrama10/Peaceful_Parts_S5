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
                right: 0px;
                margin-top: 90px;
                margin-right: 100px;
                }

                .h2-home{
                width: 400px;
                position: absolute;
                right: 0px;
                margin-top: 10px
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