import { showMessage } from "react-native-flash-message";

export const showError = (message, description) => {
    showMessage({ message, description, type: 'danger', duration: 3000 });
};

export const showSuccess = (message) => {
    showMessage({ message, type: 'success', duration: 3000 });
};