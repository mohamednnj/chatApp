import React, {useState, useRef, useEffect} from "react";
import {useLazyLoadMessages} from "./hooks/useLazyLoadMessages";
import MessagesContainer from "./components/MessagesContainer.jsx";
import {Header} from "./components/Header.jsx";
import SetNamePop from "./components/SetNamePop.jsx";
import Sidebar from "./components/Sidebar.jsx";

function App() {
    const [sender, setSender] = useState("user");
    const [showNameModal, setShowNameModal] = useState(false);
    const [totalMessages, setTotalMessages] = useState(1);

    const messagesContainerRef = useRef(null);

    const {topTriggerRef, page, hasMoreOlder, loadingOlder} =
        useLazyLoadMessages(messagesContainerRef);

    useEffect(() => {
        if (localStorage.getItem("sender")) {
            setSender(localStorage.getItem("sender"))
        } else {
            setShowNameModal(true);
        }
    }, [sender, setSender])

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            {/* Name Modal */}
            {showNameModal && (<SetNamePop setSender={setSender} setShowName={setShowNameModal}/>)}

            {/* Header - adjusted for sidebar */}
            <div className="fixed top-0 left-0 sm:left-64 right-0 z-30">
                <Header
                    totalMessages={totalMessages}
                    page={page}
                    hasMoreOlder={hasMoreOlder}
                    sender={sender}
                    loadingOlder={loadingOlder}
                />
            </div>

            {/* Layout Container */}
            <div className="flex">
                {/* Sidebar */}
                <Sidebar/>

                {/* Messages Container */}
                <div className="flex-1" style={{marginTop: "80px"}}>
                    <MessagesContainer
                        sender={sender}
                        hasMoreOlder={hasMoreOlder}
                        topTriggerRef={topTriggerRef}
                        loadingOlder={loadingOlder}
                        messagesContainerRef={messagesContainerRef}
                        setTotalMessages={setTotalMessages}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;