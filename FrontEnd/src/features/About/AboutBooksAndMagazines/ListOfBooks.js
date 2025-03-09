import clsx from "clsx";
import styles from "~/styles/Pages/About/aboutSidebarBooks.module.scss";
import { useState } from "react";
import {book_img} from '~/assets/img';
import { PDFViewer } from "~/components";
const bookList = [
  {
      id: 1,
      title: "Ấm mãi lời ca",
      fullTitle: "Ấm mãi lời ca: tập ca cổ, nhiều tác giả",
      description: "Nhân kỷ niệm 30 năm ngày giải phóng miền Nam, thống nhất Tổ quốc (30.4.1975 - 30.4.2005), Hội Văn học nghệ thuật An Giang xin giới thiệu tập ca cổ Ấm mãi lời ca, gồm những tác phẩm viết về đề tài truyền thống của tác giả An Giang. Hầu hết tác phẩm trong tập này được hoàn thành trong Trại sáng tác kịch bản sân khấu và bài ca cổ do Hội Văn học nghệ thuật và Sở Văn hóa thông tin An Giang kết hợp tổ chức tại Soài So (Tri Tôn) năm 2004.",
      image: book_img,
      pdfUrl: "https://docs.google.com/document/d/19xKKbQSIoTJYUIXdTAgGG6uGS-j8eUwS0g61T0j9cI0/edit?tab=t.0",
  },
  {
      id: 2,
      title: "Ấm mãi lời ca",
      fullTitle: "Ấm mãi lời ca: tập ca cổ, nhiều tác giả",
      description: "Nhân kỷ niệm 30 năm ngày giải phóng miền Nam, thống nhất Tổ quốc (30.4.1975 - 30.4.2005), Hội Văn học nghệ thuật An Giang xin giới thiệu tập ca cổ Ấm mãi lời ca, gồm những tác phẩm viết về đề tài truyền thống của tác giả An Giang. Hầu hết tác phẩm trong tập này được hoàn thành trong Trại sáng tác kịch bản sân khấu và bài ca cổ do Hội Văn học nghệ thuật và Sở Văn hóa thông tin An Giang kết hợp tổ chức tại Soài So (Tri Tôn) năm 2004.",
      image: book_img,
      pdfUrl: "https://docs.google.com/document/d/19xKKbQSIoTJYUIXdTAgGG6uGS-j8eUwS0g61T0j9cI0/edit?tab=t.0",
  },
  {
      id: 3,
      title: "Ấm mãi lời ca",
      fullTitle: "Ấm mãi lời ca: tập ca cổ, nhiều tác giả",
      description: "Nhân kỷ niệm 30 năm ngày giải phóng miền Nam, thống nhất Tổ quốc (30.4.1975 - 30.4.2005), Hội Văn học nghệ thuật An Giang xin giới thiệu tập ca cổ Ấm mãi lời ca, gồm những tác phẩm viết về đề tài truyền thống của tác giả An Giang. Hầu hết tác phẩm trong tập này được hoàn thành trong Trại sáng tác kịch bản sân khấu và bài ca cổ do Hội Văn học nghệ thuật và Sở Văn hóa thông tin An Giang kết hợp tổ chức tại Soài So (Tri Tôn) năm 2004.",
      image: book_img,
      pdfUrl: "https://docs.google.com/document/d/19xKKbQSIoTJYUIXdTAgGG6uGS-j8eUwS0g61T0j9cI0/edit?tab=t.0",
  },
  {
      id: 4,
      title: "Ấm mãi lời ca",
      fullTitle: "Ấm mãi lời ca: tập ca cổ, nhiều tác giả",
      description: "Nhân kỷ niệm 30 năm ngày giải phóng miền Nam, thống nhất Tổ quốc (30.4.1975 - 30.4.2005), Hội Văn học nghệ thuật An Giang xin giới thiệu tập ca cổ Ấm mãi lời ca, gồm những tác phẩm viết về đề tài truyền thống của tác giả An Giang. Hầu hết tác phẩm trong tập này được hoàn thành trong Trại sáng tác kịch bản sân khấu và bài ca cổ do Hội Văn học nghệ thuật và Sở Văn hóa thông tin An Giang kết hợp tổ chức tại Soài So (Tri Tôn) năm 2004.",
      image: book_img,
      pdfUrl: "https://docs.google.com/document/d/19xKKbQSIoTJYUIXdTAgGG6uGS-j8eUwS0g61T0j9cI0/edit?tab=t.0",
  },
  {
      id: 5,
      title: "Ấm mãi lời ca",
      fullTitle: "Ấm mãi lời ca: tập ca cổ, nhiều tác giả",
      description: "Nhân kỷ niệm 30 năm ngày giải phóng miền Nam, thống nhất Tổ quốc (30.4.1975 - 30.4.2005), Hội Văn học nghệ thuật An Giang xin giới thiệu tập ca cổ Ấm mãi lời ca, gồm những tác phẩm viết về đề tài truyền thống của tác giả An Giang. Hầu hết tác phẩm trong tập này được hoàn thành trong Trại sáng tác kịch bản sân khấu và bài ca cổ do Hội Văn học nghệ thuật và Sở Văn hóa thông tin An Giang kết hợp tổ chức tại Soài So (Tri Tôn) năm 2004.",
      image: book_img,
      pdfUrl: "https://docs.google.com/document/d/19xKKbQSIoTJYUIXdTAgGG6uGS-j8eUwS0g61T0j9cI0/edit?tab=t.0",
  },
  {
      id: 6,
      title: "Ấm mãi lời ca",
      fullTitle: "Ấm mãi lời ca: tập ca cổ, nhiều tác giả",
      description: "Nhân kỷ niệm 30 năm ngày giải phóng miền Nam, thống nhất Tổ quốc (30.4.1975 - 30.4.2005), Hội Văn học nghệ thuật An Giang xin giới thiệu tập ca cổ Ấm mãi lời ca, gồm những tác phẩm viết về đề tài truyền thống của tác giả An Giang. Hầu hết tác phẩm trong tập này được hoàn thành trong Trại sáng tác kịch bản sân khấu và bài ca cổ do Hội Văn học nghệ thuật và Sở Văn hóa thông tin An Giang kết hợp tổ chức tại Soài So (Tri Tôn) năm 2004.",
      image: book_img,
      pdfUrl: "https://docs.google.com/document/d/19xKKbQSIoTJYUIXdTAgGG6uGS-j8eUwS0g61T0j9cI0/edit?tab=t.0",
  },
  {
      id: 7,
      title: "Ấm mãi lời ca",
      fullTitle: "Ấm mãi lời ca: tập ca cổ, nhiều tác giả",
      description: "Nhân kỷ niệm 30 năm ngày giải phóng miền Nam, thống nhất Tổ quốc (30.4.1975 - 30.4.2005), Hội Văn học nghệ thuật An Giang xin giới thiệu tập ca cổ Ấm mãi lời ca, gồm những tác phẩm viết về đề tài truyền thống của tác giả An Giang. Hầu hết tác phẩm trong tập này được hoàn thành trong Trại sáng tác kịch bản sân khấu và bài ca cổ do Hội Văn học nghệ thuật và Sở Văn hóa thông tin An Giang kết hợp tổ chức tại Soài So (Tri Tôn) năm 2004.",
      image: book_img,
      pdfUrl: "https://docs.google.com/document/d/19xKKbQSIoTJYUIXdTAgGG6uGS-j8eUwS0g61T0j9cI0/edit?tab=t.0",
  },
  {
      id: 8,
      title: "Ấm mãi lời ca",
      fullTitle: "Ấm mãi lời ca: tập ca cổ, nhiều tác giả",
      description: "Nhân kỷ niệm 30 năm ngày giải phóng miền Nam, thống nhất Tổ quốc (30.4.1975 - 30.4.2005), Hội Văn học nghệ thuật An Giang xin giới thiệu tập ca cổ Ấm mãi lời ca, gồm những tác phẩm viết về đề tài truyền thống của tác giả An Giang. Hầu hết tác phẩm trong tập này được hoàn thành trong Trại sáng tác kịch bản sân khấu và bài ca cổ do Hội Văn học nghệ thuật và Sở Văn hóa thông tin An Giang kết hợp tổ chức tại Soài So (Tri Tôn) năm 2004.",
      image: book_img,
      pdfUrl: "https://docs.google.com/document/d/19xKKbQSIoTJYUIXdTAgGG6uGS-j8eUwS0g61T0j9cI0/edit?tab=t.0",
  },
  {
      id: 9,
      title: "Ấm mãi lời ca",
      fullTitle: "Ấm mãi lời ca: tập ca cổ, nhiều tác giả",
      description: "Nhân kỷ niệm 30 năm ngày giải phóng miền Nam, thống nhất Tổ quốc (30.4.1975 - 30.4.2005), Hội Văn học nghệ thuật An Giang xin giới thiệu tập ca cổ Ấm mãi lời ca, gồm những tác phẩm viết về đề tài truyền thống của tác giả An Giang. Hầu hết tác phẩm trong tập này được hoàn thành trong Trại sáng tác kịch bản sân khấu và bài ca cổ do Hội Văn học nghệ thuật và Sở Văn hóa thông tin An Giang kết hợp tổ chức tại Soài So (Tri Tôn) năm 2004.",
      image: book_img,
      pdfUrl: "https://docs.google.com/document/d/19xKKbQSIoTJYUIXdTAgGG6uGS-j8eUwS0g61T0j9cI0/edit?tab=t.0",
  }
];

function ListOfBooks() {
  const [selectedBook, setSelectedBook] = useState(bookList[0]);
  return (
    <div className={clsx(styles.ListOfBooks)}>
      <div className={clsx(styles.BookContent)}>
        {selectedBook && (
          <>
      
            <h2 className={clsx(styles.BookContent__title)}>
              {selectedBook.fullTitle || selectedBook.title}
            </h2>
            <div className={clsx(styles.BookContent__info)}>
              <img
                src={selectedBook.image}
                alt={selectedBook.title}
                className={clsx(styles.BookContent__image)}
              />
              <p className={clsx(styles.BookContent__desc)}>
                {selectedBook.description}
              </p>
            </div>
            <PDFViewer url="https://static3.luatvietnam.vn/uploaded/LawJudgs/2021/12/21/ban-an-123-2021-ds-pt-103010.pdf" />
            </>
        )}
      </div>
      
    </div>
  );
}

export default ListOfBooks;