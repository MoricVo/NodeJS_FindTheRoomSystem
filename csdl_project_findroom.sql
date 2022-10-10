-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 10, 2022 at 03:00 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `csdl_project_findroom`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_admin`
--

CREATE TABLE `tbl_admin` (
  `ID_AD` int(50) NOT NULL,
  `TenDangNhap_AD` varchar(255) NOT NULL,
  `MatKhau_AD` varchar(255) NOT NULL,
  `HoTen_AD` varchar(255) NOT NULL,
  `GioiTinh` varchar(255) NOT NULL,
  `Email_AD` varchar(255) NOT NULL,
  `DienThoai_AD` int(50) NOT NULL,
  `AnhDaiDien_AD` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_admin`
--

INSERT INTO `tbl_admin` (`ID_AD`, `TenDangNhap_AD`, `MatKhau_AD`, `HoTen_AD`, `GioiTinh`, `Email_AD`, `DienThoai_AD`, `AnhDaiDien_AD`) VALUES
(1, 'Admin01', '$2b$10$XwbfKEDIu.PleZvZ/yAIhOZ9NROVAoI.njZjKSHoqHxOwVMYuiDHa', 'Nguyen Van A', 'Nam', 'nhangi11@gmail.com', 43434343, '1664604965600.jfif'),
(3, 'admin1', '$2b$10$gLR2dMX6PjY/SYxE/.RfTOpk01H2FeGy3QxyHyTn2Yi1wlAgxZiuq', 'Vo Tan Khoi', 'Nam', 'Vo Tan Khoi11@gmail.com', 32321, '1664604883122.jfif'),
(4, 'admin123', '$2b$10$kA5stthRy0GYSTWtrTzX/.RsMLUf9Xb90GZGQu.y8IXalbZOgTrd.', 'Trần Thanh Nhàng', 'Nữ', 'nhangi11@gmail.com', 964534343, '1664604975713.jfif'),
(5, 'admin12334', '$2b$10$8dF05qHZtlM3IPTEBCZalu8zNKCO7.4.zmT/vbQRhIQpD.p3MT8qK', 'Mai Tiến Khôi', 'Bê đê', 'abc@gmail.com', 8978676, '1664604982193.jfif'),
(6, 'admin12334', '$2b$10$SNGmvSvSvQrBrn18PtfcdOeZDo0yqj3/VnSl8Vk.jiMuqM.B45Lw6', 'Trần Thanh Nhàng', 'Nam', 'Vo Tan Khoi11@gmail.com', 8978676, '1664605040036.jfif');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_baidang`
--

CREATE TABLE `tbl_baidang` (
  `ID_BD` int(50) NOT NULL,
  `ID_NhaTro_BD` int(50) NOT NULL,
  `TenNguoiDang_BD` varchar(255) NOT NULL,
  `TieuDe_BD` varchar(255) NOT NULL,
  `NoiDung_BD` varchar(255) NOT NULL,
  `Anh_BD` varchar(255) NOT NULL,
  `NgayDang_BD` varchar(255) DEFAULT NULL,
  `NgayCapNhat_BD` varchar(255) DEFAULT NULL,
  `LuotXem_BD` int(50) NOT NULL,
  `GhiChu_BD` varchar(255) NOT NULL,
  `KiemDuyet_BD` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_baidang`
--

INSERT INTO `tbl_baidang` (`ID_BD`, `ID_NhaTro_BD`, `TenNguoiDang_BD`, `TieuDe_BD`, `NoiDung_BD`, `Anh_BD`, `NgayDang_BD`, `NgayCapNhat_BD`, `LuotXem_BD`, `GhiChu_BD`, `KiemDuyet_BD`) VALUES
(1, 1, 'sdsd', 'ds', 'dsds', '1664783660701.jfif', '2022-10-04 19:21:50', '2022-10-03 19:21:54', 1, 'khong', 1),
(3, 2, 'Võ Tấn Khôi1', '1212', 'vippp', '1664783323833.jfif', '2000-1-1', '2000-10-20', 1, '1', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_danhgia`
--

CREATE TABLE `tbl_danhgia` (
  `ID_DG` int(50) NOT NULL,
  `ID_NhaTro_DG` int(50) NOT NULL,
  `ID_NguoiDung_DG` int(11) NOT NULL,
  `NoiDung_DG` varchar(255) NOT NULL,
  `Diem_DG` int(50) NOT NULL,
  `Ngay_DG` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_danhgia`
--

INSERT INTO `tbl_danhgia` (`ID_DG`, `ID_NhaTro_DG`, `ID_NguoiDung_DG`, `NoiDung_DG`, `Diem_DG`, `Ngay_DG`) VALUES
(2, 1, 15, 'nhu', 4, '2022-10-10 18:48:07'),
(3, 115, 100, 'ngu', 3, '2022-10-10 18:49:31'),
(4, 1, 15, 'adasd', 5, '2022-10-10 18:50:21'),
(5, 2, 15, 'nghu', 4, '2022-10-10 18:53:27'),
(6, 1, 15, 'Alo gu', 1, '2022-10-10 18:57:15'),
(7, 2, 15, 'Trọ dơ', 4, '2022-10-10 19:00:11'),
(8, 3, 15, 'nhu shit', 5, '2022-10-10 19:51:00'),
(9, 3, 15, 'Như cc', 5, '2022-10-10 19:52:43'),
(10, 3, 15, 'Alo', 5, '2022-10-10 19:52:51'),
(11, 3, 15, 'Hello', 3, '2022-10-10 19:53:03');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_danhsachthue`
--

CREATE TABLE `tbl_danhsachthue` (
  `ID_DST` int(50) NOT NULL,
  `ID_NT_DST` int(50) NOT NULL,
  `ID_PHONG_DST` int(50) NOT NULL,
  `NgayBD_DST` date NOT NULL,
  `GhiChu_DST` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_danhsachthue`
--

INSERT INTO `tbl_danhsachthue` (`ID_DST`, `ID_NT_DST`, `ID_PHONG_DST`, `NgayBD_DST`, `GhiChu_DST`) VALUES
(1, 1, 1, '2022-09-13', 'Khong');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_nguoidung`
--

CREATE TABLE `tbl_nguoidung` (
  `ID_ND` int(50) NOT NULL,
  `Ten_ND` varchar(255) NOT NULL,
  `TenDN_ND` varchar(255) NOT NULL,
  `MK_ND` varchar(255) NOT NULL,
  `NgaySinh_ND` varchar(255) NOT NULL,
  `Anh_ND` varchar(255) NOT NULL,
  `LoaiNguoiDung_ND` varchar(255) NOT NULL,
  `Email_ND` varchar(255) NOT NULL,
  `DienThoai_ND` int(50) NOT NULL,
  `DiaChi_ND` varchar(255) NOT NULL,
  `CMND_ND` int(50) NOT NULL,
  `KichHoat_ND` int(50) NOT NULL,
  `NgayDang_ND` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_nguoidung`
--

INSERT INTO `tbl_nguoidung` (`ID_ND`, `Ten_ND`, `TenDN_ND`, `MK_ND`, `NgaySinh_ND`, `Anh_ND`, `LoaiNguoiDung_ND`, `Email_ND`, `DienThoai_ND`, `DiaChi_ND`, `CMND_ND`, `KichHoat_ND`, `NgayDang_ND`) VALUES
(1, 'Trần Ngọc Hạnh', 'admin1', '124', '2022-09-07', '1664812400047.jfif', 'khachhang', 'tankhoi123K@gmail.com', 912342221, '506 Vọng Thuê An Giang Việt Nam', 342033171, 1, '2022-09-21'),
(12, 'Võ vôi ', 'tankhoi123s', '$2b$10$ZBR/7kkzITSiOR.Pne1EIeobqWpFPrC9MDmRm6D3snEvv5LhLHmlq', '', '1664812243919.jfif', 'chutro', 'adds2323@gmail.com', 8565, '08565', 1223, 1, '0000-00-00'),
(15, 'Võ vôi ', 'tankhoine', '$2b$10$SUvUt9SCwZgrn8jY6P1hkeDsCp3JHXj0ouIfjdXPajP1s0gZPcoPm', 'ssd', '1664851561552.jfif', 'khachhang', 'adds2323@gmail.com', 8565, '08565', 122323, 1, '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_nguoithuetro`
--

CREATE TABLE `tbl_nguoithuetro` (
  `ID_NTT` int(50) NOT NULL,
  `HoTen_NTT` varchar(255) NOT NULL,
  `SDT_NTT` int(50) NOT NULL,
  `CCCD_NTT` int(50) NOT NULL,
  `NgheNghiep_NTT` varchar(255) NOT NULL,
  `GioiTinh_NTT` varchar(255) NOT NULL,
  `NgayDang_NTT` date NOT NULL DEFAULT current_timestamp(),
  `NgayCapNhat_NTT` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_nguoithuetro`
--

INSERT INTO `tbl_nguoithuetro` (`ID_NTT`, `HoTen_NTT`, `SDT_NTT`, `CCCD_NTT`, `NgheNghiep_NTT`, `GioiTinh_NTT`, `NgayDang_NTT`, `NgayCapNhat_NTT`) VALUES
(1, 'Levi', 965331233, 342033171, 'Làm ruộng', 'Nam', '2022-09-28', '2022-09-11');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_nhatro`
--

CREATE TABLE `tbl_nhatro` (
  `ID_NT` int(50) NOT NULL,
  `TenNhaTro_NT` varchar(255) NOT NULL,
  `ID_ChuTro_NT` int(50) NOT NULL,
  `DiaChi_NT` varchar(255) NOT NULL,
  `SoDienThoai_NT` int(50) NOT NULL,
  `NgayDang_NT` datetime NOT NULL DEFAULT current_timestamp(),
  `NgayCapNhat_NT` datetime NOT NULL DEFAULT current_timestamp(),
  `Anh_NT` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_nhatro`
--

INSERT INTO `tbl_nhatro` (`ID_NT`, `TenNhaTro_NT`, `ID_ChuTro_NT`, `DiaChi_NT`, `SoDienThoai_NT`, `NgayDang_NT`, `NgayCapNhat_NT`, `Anh_NT`) VALUES
(1, 'Nhà trọ Bảo Lộc', 12, '86/8 Bầu Cát 2, Phường 12, Quận Tân Bình, Hồ Chí Minh', 906990224, '2022-10-06 16:07:56', '2022-10-06 16:07:56', ''),
(2, 'PHÒNG TRỌ SIÊU MINI', 1, '196/17 Đề Thám, Phường Cầu Ông Lãnh, Quận 1, Hồ Chí Minh', 982461659, '2022-10-06 16:45:50', '2022-10-06 16:45:50', ''),
(3, 'Nhà trọ Ngân Ngân', 12, '735 Hà Hoàng Hổ, P.Đông Xuyên, TP.Long Xuyên, An Giang', 97524521, '2022-10-07 17:30:04', '2022-10-07 17:30:04', '');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_phongtro`
--

CREATE TABLE `tbl_phongtro` (
  `ID_PT` int(50) NOT NULL,
  `IDNhaTro_PT` int(50) NOT NULL,
  `TenPhong_PT` varchar(255) NOT NULL,
  `LoaiPhong_PT` varchar(255) NOT NULL,
  `GiaPhong_PT` double NOT NULL,
  `HinhAnh_PT` varchar(255) NOT NULL,
  `MoTa_PT` varchar(255) NOT NULL,
  `DienTich_PT` varchar(255) NOT NULL,
  `Dien_PT` double NOT NULL,
  `Nuoc_PT` double NOT NULL,
  `DatCoc_PT` double NOT NULL,
  `TrangThai_PT` varchar(255) NOT NULL,
  `Wifi_PT` varchar(255) NOT NULL,
  `SucChua_PT` int(50) NOT NULL,
  `GhiChu_PT` varchar(255) NOT NULL,
  `NgayDang_PT` date NOT NULL,
  `NgayCapNhat_PT` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_tienich`
--

CREATE TABLE `tbl_tienich` (
  `ID_TI` int(50) NOT NULL,
  `Icon_TI` varchar(255) NOT NULL,
  `Ten_TI` varchar(255) NOT NULL,
  `Gia_TI` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_tienich`
--

INSERT INTO `tbl_tienich` (`ID_TI`, `Icon_TI`, `Ten_TI`, `Gia_TI`) VALUES
(1, 'Nott', 'Bể bơiii', 14),
(2, 'not', 'Con cặc lỏ', 0),
(4, '<i class=\"fa-sharp fa-solid fa-cloud\"></i>', 'Music', 9);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_admin`
--
ALTER TABLE `tbl_admin`
  ADD PRIMARY KEY (`ID_AD`);

--
-- Indexes for table `tbl_baidang`
--
ALTER TABLE `tbl_baidang`
  ADD PRIMARY KEY (`ID_BD`);

--
-- Indexes for table `tbl_danhgia`
--
ALTER TABLE `tbl_danhgia`
  ADD PRIMARY KEY (`ID_DG`);

--
-- Indexes for table `tbl_danhsachthue`
--
ALTER TABLE `tbl_danhsachthue`
  ADD PRIMARY KEY (`ID_DST`);

--
-- Indexes for table `tbl_nguoidung`
--
ALTER TABLE `tbl_nguoidung`
  ADD PRIMARY KEY (`ID_ND`);

--
-- Indexes for table `tbl_nguoithuetro`
--
ALTER TABLE `tbl_nguoithuetro`
  ADD PRIMARY KEY (`ID_NTT`);

--
-- Indexes for table `tbl_nhatro`
--
ALTER TABLE `tbl_nhatro`
  ADD PRIMARY KEY (`ID_NT`);

--
-- Indexes for table `tbl_phongtro`
--
ALTER TABLE `tbl_phongtro`
  ADD PRIMARY KEY (`ID_PT`);

--
-- Indexes for table `tbl_tienich`
--
ALTER TABLE `tbl_tienich`
  ADD PRIMARY KEY (`ID_TI`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_admin`
--
ALTER TABLE `tbl_admin`
  MODIFY `ID_AD` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `tbl_baidang`
--
ALTER TABLE `tbl_baidang`
  MODIFY `ID_BD` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_danhgia`
--
ALTER TABLE `tbl_danhgia`
  MODIFY `ID_DG` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tbl_danhsachthue`
--
ALTER TABLE `tbl_danhsachthue`
  MODIFY `ID_DST` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_nguoidung`
--
ALTER TABLE `tbl_nguoidung`
  MODIFY `ID_ND` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `tbl_nguoithuetro`
--
ALTER TABLE `tbl_nguoithuetro`
  MODIFY `ID_NTT` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_nhatro`
--
ALTER TABLE `tbl_nhatro`
  MODIFY `ID_NT` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_phongtro`
--
ALTER TABLE `tbl_phongtro`
  MODIFY `ID_PT` int(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_tienich`
--
ALTER TABLE `tbl_tienich`
  MODIFY `ID_TI` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
