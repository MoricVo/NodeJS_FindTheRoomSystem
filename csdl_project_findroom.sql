-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 25, 2022 at 06:55 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

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
  `Email_AD` varchar(255) NOT NULL,
  `DienThoai_AD` int(50) NOT NULL,
  `AnhDaiDien_AD` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `NgayDang_BD` date NOT NULL,
  `NgayCapNhat_BD` date NOT NULL,
  `LuotXem_BD` int(50) NOT NULL,
  `GhiChu_BD` varchar(255) NOT NULL,
  `KiemDuyet_BD` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_danhgia`
--

CREATE TABLE `tbl_danhgia` (
  `ID_ND_DG` int(50) NOT NULL,
  `ID_NT_DG` int(50) NOT NULL,
  `NoiDung_DG` varchar(255) NOT NULL,
  `Diem_DG` int(50) NOT NULL,
  `Ngay_DG` date NOT NULL,
  `NgayDang_DG` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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

-- --------------------------------------------------------

--
-- Table structure for table `tbl_nguoidung`
--

CREATE TABLE `tbl_nguoidung` (
  `ID_ND` int(50) NOT NULL,
  `Ten_ND` varchar(255) NOT NULL,
  `TenDN_ND` varchar(255) NOT NULL,
  `MK_ND` varchar(255) NOT NULL,
  `NgaySinh_ND` date NOT NULL,
  `LoaiNguoiDung_ND` varchar(255) NOT NULL,
  `Email_ND` varchar(255) NOT NULL,
  `DienThoai_ND` int(50) NOT NULL,
  `DiaChi_ND` varchar(255) NOT NULL,
  `CMND_ND` int(50) NOT NULL,
  `KichHoat_ND` int(50) NOT NULL,
  `NgayDang_ND` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_nguoithuetro`
--

CREATE TABLE `tbl_nguoithuetro` (
  `ID_NT` int(50) NOT NULL,
  `HoTen_NT` varchar(255) NOT NULL,
  `SDT_NT` int(50) NOT NULL,
  `CCCD_NT` int(50) NOT NULL,
  `NgheNghiep_NT` varchar(255) NOT NULL,
  `GioiTinh_NT` varchar(255) NOT NULL,
  `NgayDang_NT` date NOT NULL,
  `NgayCapNhat_NT` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_nhatro`
--

CREATE TABLE `tbl_nhatro` (
  `ID_NTRO` int(50) NOT NULL,
  `Ten_NTRO` varchar(255) NOT NULL,
  `ID_ND_NTRO` int(50) NOT NULL,
  `DiaChi_ND_NTRO` varchar(255) NOT NULL,
  `SDTLienHe_ND_NTRO` int(50) NOT NULL,
  `SDTZalo_ND_NTRO` int(50) NOT NULL,
  `NgayDang_NTRO` date NOT NULL,
  `NgayCapNhat_NTRO` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `Ma_TI` varchar(255) NOT NULL,
  `Ten_TI` varchar(255) NOT NULL,
  `Gia_TI` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  ADD PRIMARY KEY (`ID_ND_DG`);

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
  ADD PRIMARY KEY (`ID_NT`);

--
-- Indexes for table `tbl_nhatro`
--
ALTER TABLE `tbl_nhatro`
  ADD PRIMARY KEY (`ID_NTRO`);

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
  MODIFY `ID_AD` int(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_baidang`
--
ALTER TABLE `tbl_baidang`
  MODIFY `ID_BD` int(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_danhgia`
--
ALTER TABLE `tbl_danhgia`
  MODIFY `ID_ND_DG` int(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_danhsachthue`
--
ALTER TABLE `tbl_danhsachthue`
  MODIFY `ID_DST` int(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_nguoidung`
--
ALTER TABLE `tbl_nguoidung`
  MODIFY `ID_ND` int(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_nguoithuetro`
--
ALTER TABLE `tbl_nguoithuetro`
  MODIFY `ID_NT` int(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_nhatro`
--
ALTER TABLE `tbl_nhatro`
  MODIFY `ID_NTRO` int(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_phongtro`
--
ALTER TABLE `tbl_phongtro`
  MODIFY `ID_PT` int(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_tienich`
--
ALTER TABLE `tbl_tienich`
  MODIFY `ID_TI` int(50) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
