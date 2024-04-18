/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function ToastifyMessage({ notification }) {

    useEffect(() => {
        toast(notification.text);
    }, [notification]);

    return (
        <div>
            <ToastContainer
                toastStyle={{
                    backgroundColor: notification.type === 'error' ? 'crimson' : 'green',
                    color: '#fff',
                }}
            />
        </div>
    );
}
export default ToastifyMessage;