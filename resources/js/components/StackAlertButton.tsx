import { BellRing } from 'lucide-react';
import Swal from 'sweetalert2';

type StackAlertButtonProps = {
    className: string;
    text: string;
};

export default function StackAlertButton({ className, text }: StackAlertButtonProps) {
    const showWelcomeAlert = async () => {
        await Swal.fire({
            title: 'Stack siap dipakai',
            text,
            icon: 'success',
            confirmButtonText: 'Lanjut',
            confirmButtonColor: '#d97706',
        });
    };

    return (
        <button className={className} onClick={showWelcomeAlert} type="button">
            <BellRing className="h-4 w-4" />
            Tes SweetAlert
        </button>
    );
}
