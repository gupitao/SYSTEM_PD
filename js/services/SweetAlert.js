angular.module('app.services')
	.service("SweetAlert", function ($window) {
		this.loading = function(title, msg){
			if(!msg) msg = "";
			Swal.fire({
				titleText: title,
				html: "<p>"+msg+"</p><div align='center' style='padding: 15px'>" +
				"<div style='margin-bottom: 10px; visibility: visible; opacity: 1;' class='la-ball-fall'>" +
				"<div style='color:orange'></div>" +
				"<div style='color:orange'></div>" +
				"<div style='color:orange'></div>" +
				"</div>" +
				"</div>",
				showCancelButton: false,
				showConfirmButton: false
			})
		}
		this.close = Swal.close;
		this.APIError = function(msg, title){
			title = title|| "Erro"
			return Swal.fire({
				titleText: title,
				text: msg,
				type: 'error'
			})
		};
		this.error = function(msg, title) {
			title = title|| "Erro"
			return Swal.fire({
				titleText: title,
				text: msg,
				type: 'error'
			})
		};
		this.info = function(msg, title) {
			title = title|| "Informação"
			return Swal.fire({
				titleText: title,
				text: msg,
				type: 'info'
			})
		};
		this.success = function(msg, title){
			title = title||"Sucesso";
			return Swal.fire({
				titleText: title,
				text: msg,
				type: 'success'
			})
		};
		this.warning = function(msg, title) {
			title = title || "Atenção"
			return Swal.fire({
				titleText: title,
				text: msg,
				type: 'warning'
			})
		};
		this.confirm = function(msg, title) {
			title = title || "Atenção"
			return Swal.fire({
				titleText: title,
				text: msg,
				type: 'question',
				showConfirmButton: true,
				showCancelButton: true,
				confirmButtonText: "Sim",
				cancelButtonText: "Não"
			}).then(result=>{
				if(result.dismiss)
					return Promise.reject("CANCEL");
				return result.value;
			})
		};
		this.noButtonAlert = function(msg, title, type) {
			title = title || ""
			type = type || "info"
			return Swal.fire({
				titleText: title,
				text: msg,
				type: type,
				showConfirmButton: false,
				showCancelButton: false,
				backdrop: false,
				allowEscapeKey: false,
				allowOutsideClick: false
			})
		};



	});
