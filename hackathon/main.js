let currentAppointmentCode = "";
let isAppointmentValid = false;
let totalAppointments = 0;
let totalRevenue = 0;

function formatCurrency(amount) {
    return amount.toLocaleString("vi-VN") + " VNĐ";
}

let choice = true;

while (choice) {
    const menuPrompt = `==========================================
                                HỆ THỐNG ĐẶT LỊCH LOTUS SPA
                        ==========================================
                        1. Nhập và kiểm chuẩn mã lịch hẹn
                        2. Tính tiền liệu trình chăm sóc
                        3. Thẩm định mã khách hàng may mắn
                        0. Thoát chương trình
                        ==========================================
                        Vui lòng nhập lựa chọn của bạn (0 - 3):`;

    let choiceInput = prompt(menuPrompt);

    if (choiceInput === null) {
        choiceInput = "0";
    }
    const choice = choiceInput.trim();
    switch (choice) {
        case "1": {
            currentAppointmentCode = "";
            isAppointmentValid = false;
            let rawInput = prompt("Nhập chuỗi mã lịch hẹn:");
            if (rawInput === null) {
                alert("Chưa nhập mã lịch hẹn");
                break;
            }
            let cleanedCode = rawInput.trim().toUpperCase();
            if (cleanedCode === "") {
                alert("Chưa nhập mã lịch hẹn");
                break;
            }
            if (cleanedCode.length < 6) {
                alert("Mã lịch hẹn phải có độ dài tối thiểu 6 ký tự.");
                break;
            }
            if (!cleanedCode.startsWith("SPA-")) {
                alert('Mã lịch hẹn phải bắt đầu bằng "SPA-"');
                break;
            }
            if (cleanedCode.includes(" ")) {
                alert("Mã lịch hẹn không được chứa khoảng trắng ở giữa.");
                break;
            }
            currentAppointmentCode = cleanedCode;
            isAppointmentValid = true;
            alert(`Nhập mã lịch hẹn thành công: ${currentAppointmentCode}`);
            break;
        }
        case "2": {
            if (!isAppointmentValid) {
                alert("Vui lòng chọn Case 1 để nhập mã lịch hẹn hợp lệ trước");
                break;
            }
            let treatmentCount = null;
            let pricePerTreatment = null;
            while (true) {
                let input = prompt("Nhập số liệu trình chăm sóc :");
                if (input === null) {
                    alert("Đã hủy giao dịch. Quay về menu chính.");
                    break;
                }
                input = input.trim();
                let num = Number(input);
                if (input !== "" && Number.isInteger(num) && num > 0) {
                    treatmentCount = num;
                    break;
                } else {
                    alert("Số liệu trình phải là số nguyên > 0. Vui lòng nhập lại");
                }
            }
            if (treatmentCount === null) 
                break;
            while (true) {
                let input = prompt("Nhập giá mỗi liệu trình (VNĐ, số nguyên > 0):");
                if (input === null) {
                    alert("Đã hủy giao dịch. Quay về menu chính.");
                    break;
                }
                input = input.trim();
                let num = Number(input);

                if (input !== "" && Number.isInteger(num) && num > 0) {
                    pricePerTreatment = num;
                    break;
                } else {
                    alert("Lỗi: Giá mỗi liệu trình phải là số nguyên > 0. Vui lòng nhập lại!");
                }
            }
            if (pricePerTreatment === null) break;
            let baseCost = treatmentCount * pricePerTreatment;
            let discount = treatmentCount >= 4 ? baseCost * 0.1 : 0;
            discount = Math.round(discount);
            let serviceFee = (baseCost - discount) * 0.08;
            serviceFee = Math.round(serviceFee);
            let totalCost = baseCost - discount + serviceFee;
            totalRevenue += totalCost;
            totalAppointments += 1;
            let usedCode = currentAppointmentCode;
            currentAppointmentCode = "";
            isAppointmentValid = false;
            let invoice = ` ==================================================
                                        HÓA ĐƠN DỊCH VỤ SPA
                            ==================================================
                            Mã lịch hẹn: ${usedCode}
                            Số liệu trình: ${treatmentCount}
                            Giá mỗi liệu trình: ${formatCurrency(pricePerTreatment)}
                            --------------------------------------------------
                            Chi phí cơ sở: ${formatCurrency(baseCost)}
                            Tiền giảm giá: ${formatCurrency(discount)}
                            Phí tinh dầu & khăn: ${formatCurrency(serviceFee)}
                            --------------------------------------------------
                            TỔNG THANH TOÁN: ${formatCurrency(totalCost)}
                            ==================================================`;

            alert(invoice);
            console.log(invoice);
            break;
        }
        case "3": {
            let rawCardInput = prompt("Nhập chuỗi số in trên thẻ khách hàng:");

            if (rawCardInput === null) {
                alert("Chưa nhập mã thẻ khách hàng");
                break;
            }
            let cardCode = rawCardInput.trim();
            let isNumeric = /^[0-9]+$/.test(cardCode);
            let isAllZeros = /^0+$/.test(cardCode);

            if (!isNumeric || cardCode.length < 2 || isAllZeros) {
                alert("Mã thẻ không hợp lệ");
                break;
            }
            let reversedCode = cardCode.split("").reverse().join("");
            let isPalindrome = cardCode === reversedCode;
            let digitSum = 0;
            for (let i = 0; i < cardCode.length; i++) {
                digitSum += parseInt(cardCode[i], 10);
            }
            let isDivisibleBy9 = digitSum % 9 === 0;
            let prizeText = "";
            if (isPalindrome && isDivisibleBy9) {
                prizeText = "Giải Đặc biệt: Gói massage toàn thân miễn phí trị giá 900.000 VNĐ";
            } else if (isPalindrome) {
                prizeText = "Giải Nhất: Liệu trình chăm sóc da mặt trị giá 300.000 VNĐ";
            } else if (isDivisibleBy9) {
                prizeText = "Giải Nhì: Voucher giảm 50.000 VNĐ cho lần hẹn kế tiếp";
            } else {
                prizeText = "Không trúng thưởng";
            }
            let resultOutput = `==================================================
                                        KẾT QUẢ THẨM ĐỊNH MÃ MAY MẮN
                                ==================================================
                                Mã số gốc: "${cardCode}"
                                Mã đảo ngược: "${reversedCode}"
                                Tổng chữ số: ${digitSum}
                                Chia hết cho 9: ${isDivisibleBy9 ? "Có" : "Không"}
                                --------------------------------------------------
                                KẾT QUẢ: ${prizeText}
                                ==================================================`;

            alert(resultOutput);
            console.log(resultOutput);
            break;
        }
        case "0": {
            let border = "=".repeat(50);
            let report = `${border}\n          
            BÁO CÁO TỔNG KẾT CA LÀM VIỆC\n${border}\n`;

            if (totalAppointments === 0) {
                report += "Chưa phát sinh lịch hẹn nào trong ca\n";
            } else {
                let avgRevenue = Math.round(totalRevenue / totalAppointments);
                report += `Tổng số lịch hẹn đã thanh toán: ${totalAppointments}\n`;
                report += `Tổng doanh thu: ${formatCurrency(totalRevenue)}\n`;
                report += `Doanh thu trung bình / lịch hẹn: ${formatCurrency(avgRevenue)}\n`;
            }

            report += border;

            alert(report);
            console.log(report);
            running = false;
            break;
        }
        default:
            alert("Lựa chọn không hợp lệ (vui lòng chọn từ 0 đến 3)!");
            break;
    }
}