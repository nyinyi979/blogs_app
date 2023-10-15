export default function About(){
    return(
        <div id="aboutDev" className="scroll-smooth text-neutral bg-secondary text-lg mt-16 w-11/12 rounded-md mx-auto leading-8 border-2 border-neutral-focus p-4">
            <div className="m-2">
                <h1 className="font-bold">About Us!</h1>
                <p id="aboutSite"></p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil repellendus libero necessitatibus ipsum. Odit placeat facere sequi mollitia beatae unde, aut temporibus nesciunt, optio ipsa dolorum ea esse ex sed.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil repellendus libero necessitatibus ipsum. Odit placeat facere sequi mollitia beatae unde, aut temporibus nesciunt, optio ipsa dolorum ea esse ex sed.
            </div>
                
            <div className="m-2">
                <h1 className="font-bold">About the website!</h1>
                <p id="FAQs"></p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil repellendus libero necessitatibus ipsum. Odit placeat facere sequi mollitia beatae unde, aut temporibus nesciunt, optio ipsa dolorum ea esse ex sed.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil repellendus libero necessitatibus ipsum. Odit placeat facere sequi mollitia beatae unde, aut temporibus nesciunt, optio ipsa dolorum ea esse ex sed.
            </div>

            <div className="m-2">
                <h1 className="font-bold">FAQs</h1>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil repellendus libero necessitatibus ipsum. Odit placeat facere sequi mollitia beatae unde, aut temporibus nesciunt, optio ipsa dolorum ea esse ex sed.
                <div className="join join-vertical w-full">
                    <div className="collapse collapse-plus join-item bg-primary border border-neutral">
                      <input type="radio" name="my-accordion-4"  /> 
                      <div className="collapse-title text-xl font-medium">
                        Question 1 
                      </div>
                      <div className="collapse-content"> 
                        <p>Answer 1</p>
                      </div>
                    </div>
                    <div className="collapse collapse-plus join-item bg-primary border border-neutral">
                      <input type="radio" name="my-accordion-4" /> 
                      <div className="collapse-title text-xl font-medium">
                        Question 2 
                      </div>
                      <p id="privacy_policy"></p>
                      <div className="collapse-content"> 
                        <p>Answer 2</p>
                      </div>
                    </div>
                    <div className="collapse collapse-plus join-item bg-primary border border-neutral">
                      <input type="radio" name="my-accordion-4" /> 
                      <div className="collapse-title text-xl font-medium">
                        Question 3 
                      </div>
                      <div className="collapse-content"> 
                        <p>Answer 3</p>
                      </div>
                    </div>
                </div>
                <div className="m-2">
                  <h1 className="font-bold">Privacy and policy</h1>
                  <p id="FAQs"></p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil repellendus libero necessitatibus ipsum. Odit placeat facere sequi mollitia beatae unde, aut temporibus nesciunt, optio ipsa dolorum ea esse ex sed.
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil repellendus libero necessitatibus ipsum. Odit placeat facere sequi mollitia beatae unde, aut temporibus nesciunt, optio ipsa dolorum ea esse ex sed.
                </div>
            </div>
        </div>
    )
}