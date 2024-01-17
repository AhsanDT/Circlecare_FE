import axios from "axios";

const handleSendNotification = async (data) => {
    try {
        const headers = {
            Authorization:
                "AAAAiAGL7-4:APA91bEDr4llr8vwIVqy1SvLQJD_BNS2BiPYvbMM5Ka12mItotihcU_32SClYHSWQQfR0xaUNuPhMuXYcqBpyTCseufS-wM6FJ9dGHpC4IFSR-xVKbHuN38eTyCr8KhDfSv0_IFJB85i",
        };

        let res = await axios.post("https://fcm.googleapis.com/fcm/send", data, {
            headers,
        });
        // console.log("Notification send successfully!", res);
    } catch (error) {
        console.log("Error on sending notification.", error);
    }
};

export default handleSendNotification;
