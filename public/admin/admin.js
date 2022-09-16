$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    addUserRole();
});
    function addUserRole(){
        $("#addUserRoleBtn").click(function (e) {
            e.preventDefault();
            Swal.fire({
                title: 'THÊM LOẠI TÀI KHOẢN',
                html: `
                <input type="text" id="RoleName" class="swal2-input" placeholder="Tên loại tài khoản">
                `,
                confirmButtonText: 'Thêm',
                focusConfirm: false,
                preConfirm: () => {
                  var chudename = Swal.getPopup().querySelector('#RoleName').value.trim();
                  if(chudename==''){
                    const Toast = Swal.mixin({
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 3000,
                      timerProgressBar: true,
                      didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                      }
                    })

                    Toast.fire({
                      icon: 'error',
                      title: 'Loại tài khoản không được bỏ trống'
                    });
                  }else{
                    $.ajax({
                        url: '/addNewHoiDoan',
                        type: "POST",
                        data: {
                          hoidoanname: hoidoanname,
                        },
                        success: function (response) {
                            if(response.check==1){
                                const Toast = Swal.mixin({
                                    toast: true,
                                    position: 'top-end',
                                    showConfirmButton: false,
                                    timer: 3000,
                                    timerProgressBar: true,
                                    didOpen: (toast) => {
                                      toast.addEventListener('mouseenter', Swal.stopTimer)
                                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                                    }
                                  })

                                  Toast.fire({
                                    icon: 'success',
                                    title: response.message
                                  }).then(()=>{
                                    window.location.reload();
                                  })
                            }else{
                                const Toast = Swal.mixin({
                                    toast: true,
                                    position: 'top-end',
                                    showConfirmButton: false,
                                    timer: 3000,
                                    timerProgressBar: true,
                                    didOpen: (toast) => {
                                      toast.addEventListener('mouseenter', Swal.stopTimer)
                                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                                    }
                                  })

                                  Toast.fire({
                                    icon: 'error',
                                    title: response.message
                                  })
                            }

                        }

                        });
                  }
                }
            })
        });
    }
