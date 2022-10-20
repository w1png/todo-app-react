import { Alert, Button } from "flowbite-react";
import { Fragment } from "react";
import { useCookies } from "react-cookie";

import InformationCircle from "./icons/InformationCircle";

function closeModal() {
    document.getElementById('cookiePopup')!.style.display = 'none';
}

const PopupBody = () => {
    return (
        <Fragment>
            <div className="mt-2 mb-4 text-sm"> 
                By pressing "Accept" you agree to our <span className="underline">cookie policy</span>. 
            </div>
            <div className="flex items-center justify-end space-x-4">
                <div className="">
                    <Button
                        onClick={closeModal}
                        gradientDuoTone="purpleToBlue"
                        outline={true}
                    >
                    Accept    
                    </Button>
                </div>
            </div>
        </Fragment>
    )
}

const CookiePopup = () => {
    return (
        // position absolute put in the bottom right corner of the screen and in the middle for mobile
        <div className="fixed border-[1px] bottom-2 lg:right-2 md:right-2 sm:right-0" id="cookiePopup">
            <Alert
                color="success"
                rounded={false}
                withBorderAccent={true}
                additionalContent={PopupBody()}
                icon={InformationCircle}
                >
                <h3 className="text-lg font-medium">
                    This site uses cookies to enhance your experience.
                </h3>
            </Alert>
        </div>
    )
}

export default CookiePopup;
