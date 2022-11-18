function getBotResponse(input) {
    //rock paper scissors
    if (input == "Tôi muốn tìm trọ có máy lạnh và tiệm net gần đó, chi phí rẻ !") {
        return "Ok, với yêu cầu này chúng tôi sẽ lựa chọn cho bạn đó là Bạch Long House !";
    } else if (input == "Cảm ơn bạn, cho tôi xin thêm thông tin !") {
        return "OK bạn, 0368408750 sdt chủ trọ bạn hãy liên hệ ngay sẽ được tặng 10 tiếng chơi game thoải mái trong phòng lạnh !";
    } else if (input == "Woa, thật tuyêt !") {
        return "Không có chi, hệ thống rất vui khi giúp bạn, Giang Vua";
    }

    // Simple responses
    if (input == "Xin chào! Tôi muốn tìm trọ !") {
        return "Chúng tôi sẽ giúp bạn thực hiện điều đó, với đội ngũ giàu kinh nghiệm và từng là những con nghiện game nên sẽ giuos bạn một cách nhanh chóng !";
    } else if (input == "Tạm biệt") {
        return "Hẹn gặp lại bạn ! ";
    } else {
        return "Cảm ơn bạn! Chúng tôi sẽ cho bạn sdt của các chủ trọ ở khu vực bạn cần để liên hệ !";
    }
}