import EmailResponseStatus from "./email.response.status";

class EmailResponse {
    constructor(status: EmailResponseStatus) {
        this.status = status;
    }

    status: EmailResponseStatus;

    error: any;
}

export default EmailResponse;
