import Swal from 'sweetalert2';

export const MESS_DELETE_CONFIRM = (title: string) => {
  return `Bạn chắc chắn muốn xóa ${title} này ?`;
}

export const MESS_CREATE_CONFIRM = (title: string) => {
  return `Bạn đã tạo ${title}`
}


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

export const ToastSuccess = (title: string, time: number) => {
  return Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: `${title}`,
    showConfirmButton: false,
    timer: time
  })
}

export const ToastWarning = (title: string, time: number) => {
  return Swal.fire({
    position: 'top-end',
    icon: 'warning',
    title: `${title}`,
    showConfirmButton: false,
    timer: time
  })
}

export const ToastError = (title: string, time: number) => {
  return Swal.fire({
    position: 'top-end',
    icon: 'error',
    title: `${title}`,
    showConfirmButton: false,
    timer: time
  })
}