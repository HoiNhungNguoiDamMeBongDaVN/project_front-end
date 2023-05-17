import Swal from 'sweetalert2';

export const MESS_DELETE_CONFIRM = (title: string) =>
  `Bạn chắc chắn muốn xóa ${title} này ?`;

export const ToastDeleteConfirm = (title: string, text?: string) => {
    return Swal.fire({
      title: `Xoá ${title}`,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
    });
  };