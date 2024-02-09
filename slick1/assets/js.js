const weekdays = [
	"воскресенье",
	"понедельник",
	"вторник",
	"среда",
	"четверг",
	"пятница",
	"суббота",
];
function addressToggle(obj, i) {
	$(obj).parent().find("span").removeClass("active");
	$(obj).parent().find("span").eq(i).addClass("active");
	$(obj).parent().parent().find(".footer-addr .addr").addClass("hidden");
	$(obj)
		.parent()
		.parent()
		.find(".footer-addr .addr")
		.eq(i)
		.removeClass("hidden");
}
function openModal(modal) {
	$("#" + modal).removeClass("hidden");
}
function closeModal(modal) {
	$("#" + modal).addClass("hidden");
}
function validateEmail(email){
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function payment(json, certificate) {
	let payload = { order_id: json["id"], sid: json["sid"] };
	if (json['CustomerReceipt'])
		payload['CustomerReceipt'] = json['CustomerReceipt'];
	var peoples = $("#peoples").val();
	var adults = $("#adults").val();
	var email = "";
	var address_id = $("#seladdr").val();
	var childs = $("#childs").val();
	var promo_id = $("#promo_id").val();
	var payment = $("#payment").val();
	var cert_id = $("#cert_id").val();
	var gift_id = $("#gift_id").val();
	var types = 0;
	if (!childs) childs = 0;
	let token = $("meta[name='token']").attr("content");
	var params = {};
	if (!certificate) {
		payload["tour_id"] = json["tour_id"];

		email = $("#email").val();
		params = {
			_token: token,
			seladdr: address_id,
			adults: adults,
			childs: childs,
			gift_id: gift_id,
			payment: payment,
			response: "",
			tour_id: json["tour_id"],
			sum: json["sum"],
			order_id: json["id"],
			sid: json["sid"],
		};
	} else {
		types = 2;
		email = $("#email_cert").val();
		adults = peoples;
		params = {
			_token: token,
			qty: peoples,
			promo_id: promo_id,
			payment: payment,
			cert_id: cert_id,
			gift_id: cert_id,
			response: "",
			email: email,
			order_id: json["id"],
			sum: json["sum"],
			sid: json["sid"],
			cert_id: json["cert_id"],
		};
	}
	if (json["amount"] > 0) {
		window.location.href = json['alfa'];
		return;
	} else {
		payDone(params, certificate);
	}
}

function validateCheckout(agreed) {
	let adults = $("#adults").val();
	let email = $("#email").val();
	let phone = $("#phone").val();
	let type_id = $("#type_id").val();
	let checkBox = agreed ? agreed : 'order_agreement';
	let isChecked = $("#"+checkBox).is(":checked");
	let valid = false;
	if (type_id == "3"){
		email = $('#emailDating').val();
		phone = "733333";
	}
	if (adults > 0 && email.length > 5 && phone && isChecked) {
		$("#btnCheckout").removeAttr("disabled");
	}
}
function paymake(json, certificate) {
	let payload = { order_id: json["id"], sid: json["sid"] };
	var peoples = $("#peoples").val();
	var adults = $("#adults").val();
	var email = "";
	var address_id = $("#seladdr").val();
	var childs = $("#childs").val();
	var promo_id = $("#promo_id").val();
	var cert_id = $("#cert_id").val();
	var gift_id = $("#gift_id").val();
	var types = 0;
	if (!childs) childs = 0;
	let token = $("meta[name='token']").attr("content");
	var params = {};
	if (!certificate) {
		payload["tour_id"] = json["tour_id"];
		email = $("#email").val();
		params = {
			_token: token,
			seladdr: address_id,
			adults: adults,
			childs: childs,
			gift_id: gift_id,
			response: "",
			tour_id: json["tour_id"],
			order_id: json["id"],
			sid: json["sid"],
		};
	} else {
		types = 2;
		email = $("#email_cert").val();
		adults = peoples;
		params = {
			_token: token,
			qty: peoples,
			promo_id: promo_id,
			cert_id: cert_id,
			gift_id: cert_id,
			response: "",
			email: email,
			order_id: json["id"],
			sid: json["sid"],
			cert_id: json["cert_id"],
		};
	}
	if (json["amount"] > 0) {
		payDone(params, certificate);
	} else {
		payDone(params, certificate);
	}
}
function setAddr(obj, addr, pos) {
	$(obj).parent().parent().find("a").removeClass("active");
	$(obj).addClass("active");
	let address = $("#addresses")
		.find(".dl-cell a")
		.eq(pos - 1)
		.text();
	let addr1Length = $("#tours-list .addr1").length;
	let addr2Length = $("#tours-list .addr2").length;
	if (addr == 2) {
		$(".address1.no-avail").addClass("hidden");
		if (addr2Length <= 0) $(".address2.no-avail").removeClass("hidden");
	}
	if (addr == 1) {
		$(".address2.no-avail").addClass("hidden");
		if (addr1Length <= 0) $(".address1.no-avail").removeClass("hidden");
	}
	$("#address-choose").html(address);
	$("#seladdr").val(addr);
	$("#tours-list a").addClass("hidden");
	$("#tours-list")
		.find(".addr" + addr)
		.removeClass("hidden");
}
function scrollToChoose() {
	$([document.documentElement, document.body]).animate(
		{
			scrollTop: $("#choose-date-and-time").offset().top,
		},
		2000
	);
	$("#addresses .dl-cell").eq(1).find("a").trigger("click");
}
function toggleAddr(addr) {
	let addrTime = +addr + 1;
	if (addrTime != 1) {
		$("#tours-list .addr1").addClass("hidden");
		$("#tours-list .addr2").removeClass("hidden");
	} else {
		$("#tours-list .addr2").addClass("hidden");
		$("#tours-list .addr1").removeClass("hidden");
	}
}
function payDone(params, certificate) {
	if (certificate) {
		$.post(MAIN_HOST + "cert_done", params, function (json) {
			if (+json["status"] > 1) {
				$("#paymentDone").removeClass("hidden");
				$("#checkLeft").addClass("hidden");
				$("#checkRight").addClass("hidden");
				$("#checkoutLeft").removeClass("hidden");
				//window.location.href = MAIN_HOST + "ru/thank-you?orderId=" + params["sid"];
			}
		});
	} else {
		$.post(MAIN_HOST + "pay_done", params, function (json) {
			if (json["status"] > 0) {
				$("#paymentDone").removeClass("hidden");
				$("#checkLeft").addClass("hidden");
				$("#checkRight").addClass("hidden");
				$("#checkoutLeft").removeClass("hidden");
				closeModal("buyFormContainerApp");
				//window.location.href = MAIN_HOST + "ru/thank-you?orderId=" + params["sid"];
			}
		});
	}
}
function calcPrice() {
	let price = $("#priceAdult").val();
	let child = $("#priceChild").val();
	let adults = $("#adults").val();
	let childs = $("#childs").val();
	let groupPrice = $("#group_price").val();
	if (!childs) childs = 0;
	let total = 0;
	let tickets = +adults + parseInt(childs);
	if (+adults > 0) {
		total = +price * parseInt(adults);
	}
	if (+childs > 0) {
		total += +child * parseInt(childs);
	}
	if ( tickets == 8 && groupPrice) { // group price
		total = +groupPrice;
	}
	$("#price").html(total.toFixed(0));
	$("#total").val(total);
	$("#fixPrice").val(total);
}
function pronouns(qty, isAdult, block) {
	if (isAdult) {
		// for certificate
		if (block && block == "gift_pronoun") {
			let lbl = "человек";
			if ([2, 3, 4].includes(+qty)) {
				lbl = "человека";
			} else lbl = "человек";
			$("#" + block).html(lbl);
		} else {
			let lbl = "взрослый";
			if (+qty == 1) {
				lbl = "взрослый";
			} else lbl = "взрослых";
			$("#aged").html(lbl);
		}
	} else {
		let lbl = "детский";
		if (+qty == 1) {
			lbl = "детский";
		} else lbl = "детских";
		$("#youth").html(lbl);
	}
}
function calcDiscount(promo, isCert, isMinus) {
	let discount = 0;
	let sum = parseInt($("#fixPrice").val());
	if (promo) discount = promo;
	else discount = parseInt($("#proc_discount").val());
	let proc = sum;
	if (sum > 0) {
		if (isMinus) {
			proc = isMinus;
			if (sum - parseInt(isMinus) < 0) proc = sum;
		} else {
			proc = (sum * discount) / 100;
		}
		let whole = sum - proc;
		if (isCert) {
			$("#total_cert").html(whole.toFixed(2));
			$("#total").val(whole);
		} else {
			$("#price").html(whole.toFixed(2));
			$("#total").val(whole);
		}
	}
}
function validateFrm(checkField) {
	let adults = $("#adults").val();
	let childs = $("#childs").val();
	if (!childs) childs = 0;
	let email = $("#email").val();
	let phone = $("#phone").val();
	let checkBox = checkField ? checkField : 'order_agreement';
	let agreed = $("#"+checkBox).is(":checked");
	let promo_id = $("#promo_id").val();
	let paytype = $("#payment").val();
	var address_id = $("#seladdr").val();
	let cert_id = $("#cert_id").val();

	let tour_id = $("#tour_id").val();
	let sum = $("#total").val();
	//let address = $('#seladdr').val();
	if (adults && email && phone) {
		let self = this;
		let token = $("meta[name='token']").attr("content");
		let params = {
			tour_id: tour_id,
			promo_id: promo_id,
			cert_id: cert_id,
			seladdr: address_id,
			adults: adults,
			adults: adults,
			childs: childs,
			payment: paytype,
			_token: token,
			sum: sum,
			email: email,
			phone: phone,
		};
		// if certificate applied - mark as used

		if (cert_id > 0) {
			let peoples = +adults + parseInt(childs);
			$.post(
				MAIN_HOST + "apply_certificate",
				{
					_token: token,
					tour_id: tour_id,
					adults: peoples,
					seladdr: address_id,
					promo_id: promo_id,
					cert_id: cert_id,
					email: email,
					phone: phone,
					order_id: 0,
				},
				function (json) {
					if (json["status"] == 1) {
						$("#paymentDone").removeClass("hidden");
						$("#checkLeft").addClass("hidden");
						$("#checkRight").addClass("hidden");
						$("#checkoutLeft").removeClass("hidden");
					}
				}
			);
		} else {
			$.post(MAIN_HOST + "pays", params, function (json) {
				if (json["status"] == 1) {
					//paymake(json);
					window.location.href = json['alfa'];
					//payment(json);
				}
			});
		}
	}
}
function validCert(obj) {
	let email = $("#email_cert").val();
	if (email && email.length > 5 && $("#certagree").is(":checked")) {
		$("#buyCert").removeAttr("disabled");
	} else $("#buyCert").attr("disabled", true);
}
function selectRows(qty, curr, field) {
	let adult = 0;
	let child = 0;
	let rows1 = "";
	let rows2 = "";
	let total = qty;
	let totalAdult = qty;
	let totalChild = qty;
	let avail = $("#avail").val();
	let priceChild = $("#priceChild").val();
	let selAdults = $("#adults").val();
	let selChild = $("#childs").val();
	let selected = ["", ""];
	if (+priceChild > 0) totalChild -= 1; // with child min 1 parent

	if (qty == 0) {
		if (avail <= 1) return;
		total = parseInt(avail);
		if (field == "child") {
			//totalAdult = +avail - parseInt($(curr)).val();
			totalAdult = +avail - parseInt($(curr).val());
			totalChild = parseInt($("#childs").val());
			selected = [totalAdult, totalChild];
		} else {
			totalAdult = parseInt($("#adults").val());
			totalChild = +avail - parseInt($(curr).val());
			selected = [totalAdult, totalChild];
		}
	}
	for (
		let n = 1;
		1 <= totalAdult ? n <= totalAdult : totalAdult <= n;
		1 <= totalAdult ? n++ : n--
	) {
		let sel = selAdults == n ? " selected" : "";
		rows1 += '<option value="' + n + '"' + sel + ">" + n + "</option>";
	}
	if (0 < totalChild) {
		for (
			let n = 0;
			1 <= totalChild ? n <= totalChild : totalChild <= n;
			1 <= totalChild ? n++ : n--
		) {
			let sel = selChild == n ? " selected" : "";
			rows2 += '<option value="' + n + '"' + sel + ">" + n + "</option>";
		}
	}
	$("#adults").html(rows1);
	$("#childs").html(rows2);
}

$(function () {
	//$(".phone-mask").mask("+7(999) 999-9999");
	$("#callbackBtn, #callbackBtn2").click(function (e) {
		e.preventDefault();
		let modalForm = $(this).closest("form");
		$(modalForm).find(".callErr > font").html('');
		let frm = $(modalForm).serialize();
		let self = this;
		$.post(MAIN_HOST + "callback", frm, function (json) {
			if (json["status"] == 1) {
				$(modalForm).find(".callFrm").addClass("hidden");
				$(modalForm).find(".callFrm").find(".call-fields").addClass("hidden");
				$(modalForm).find(".callErr").addClass("hidden");
				$(modalForm).find(".callOk").removeClass("hidden");
			} else {
				let mess =
					json["status"] != 2
						? "Произошла ошибка! "
						: "Заполните все поля!";
				$(modalForm).find(".callErr").find('font').html(mess);
			}
		});
		return false;
	});

	var burger = $("#menu-mobile-link");
	var menu = $(".menu-wrapper.sticky");
	var scrollPos = 0;

	if (burger) {
		burger.on("click", function () {
			menu.toggleClass("hidden-completely");
		});
		$(window).on("click", function (e) {
			var target = $(e.target);

			if (
				!target.is("#menu-mobile-link") &&
				!target.is(".material-icons")
			) {
				if (!target.is(".menu-wrapper.sticky")) {
					menu.addClass("hidden-completely");
				}
			}
		});

		/*$(window).scroll(function () {
			var st = $(this).scrollTop();
			if (st > scrollPos) {
				menu.addClass("hidden-completely");
			}
			scrollPos = st;
 		}); */
	}
});
