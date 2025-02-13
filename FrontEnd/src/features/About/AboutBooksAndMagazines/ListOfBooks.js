import clsx from "clsx";
import styles from "~/styles/Pages/About/aboutSidebarBooks.module.scss";
import { useState } from "react";
import {ammailoica} from '~/assets/img';

const bookList = [
  {
    id: 1,
    title: "Ấm mãi lời ca",
    fullTitle: "Ấm mãi lời ca: tập ca cổ, nhiều tác giả",
    description: "Nhân kỷ niệm 30 năm ngày giải phóng miền Nam, thống nhất Tổ quốc (30.4.1975 - 30.4.2005), Hội Văn học nghệ thuật An Giang xin giới thiệu tập ca cổ Ấm mãi lời ca, gồm những tác phẩm viết về đề tài truyền thống của tác giả An Giang. Hầu hết tác phẩm trong tập này được hoàn thành trong Trại sáng tác kịch bản sân khấu và bài ca cổ do Hội Văn học nghệ thuật và Sở Văn hóa thông tin An Giang kết hợp tổ chức tại Soài So (Tri Tôn) năm 2004.",
    image: ammailoica,
    pdfUrl:"https://docs.google.com/document/d/19xKKbQSIoTJYUIXdTAgGG6uGS-j8eUwS0g61T0j9cI0/edit?tab=t.0",
  },
  {
    id: 2,
    title: "Ấm mãi lời ca",
    fullTitle: "Ấm mãi lời ca: tập ca cổ, nhiều tác giả",
    description: "Nhân kỷ niệm 30 năm ngày giải phóng miền Nam, thống nhất Tổ quốc (30.4.1975 - 30.4.2005), Hội Văn học nghệ thuật An Giang xin giới thiệu tập ca cổ Ấm mãi lời ca, gồm những tác phẩm viết về đề tài truyền thống của tác giả An Giang. Hầu hết tác phẩm trong tập này được hoàn thành trong Trại sáng tác kịch bản sân khấu và bài ca cổ do Hội Văn học nghệ thuật và Sở Văn hóa thông tin An Giang kết hợp tổ chức tại Soài So (Tri Tôn) năm 2004.",
    image: ammailoica,
    pdfUrl:"https://docs.google.com/document/d/19xKKbQSIoTJYUIXdTAgGG6uGS-j8eUwS0g61T0j9cI0/edit?tab=t.0",
  },
  {
    id: 3,
    title: "Ấm mãi lời ca",
    fullTitle: "Ấm mãi lời ca: tập ca cổ, nhiều tác giả",
    description: "Nhân kỷ niệm 30 năm ngày giải phóng miền Nam, thống nhất Tổ quốc (30.4.1975 - 30.4.2005), Hội Văn học nghệ thuật An Giang xin giới thiệu tập ca cổ Ấm mãi lời ca, gồm những tác phẩm viết về đề tài truyền thống của tác giả An Giang. Hầu hết tác phẩm trong tập này được hoàn thành trong Trại sáng tác kịch bản sân khấu và bài ca cổ do Hội Văn học nghệ thuật và Sở Văn hóa thông tin An Giang kết hợp tổ chức tại Soài So (Tri Tôn) năm 2004.",
    image: ammailoica,
    pdfUrl:"https://docs.google.com/document/d/19xKKbQSIoTJYUIXdTAgGG6uGS-j8eUwS0g61T0j9cI0/edit?tab=t.0",
  },
  {
    id: 4,
    title: "Ấm mãi lời ca",
    fullTitle: "Ấm mãi lời ca: tập ca cổ, nhiều tác giả",
    description: "Nhân kỷ niệm 30 năm ngày giải phóng miền Nam, thống nhất Tổ quốc (30.4.1975 - 30.4.2005), Hội Văn học nghệ thuật An Giang xin giới thiệu tập ca cổ Ấm mãi lời ca, gồm những tác phẩm viết về đề tài truyền thống của tác giả An Giang. Hầu hết tác phẩm trong tập này được hoàn thành trong Trại sáng tác kịch bản sân khấu và bài ca cổ do Hội Văn học nghệ thuật và Sở Văn hóa thông tin An Giang kết hợp tổ chức tại Soài So (Tri Tôn) năm 2004.",
    image: ammailoica,
    pdfUrl:"https://docs.google.com/document/d/19xKKbQSIoTJYUIXdTAgGG6uGS-j8eUwS0g61T0j9cI0/edit?tab=t.0",
  },
  {
    id: 5,
    title: "Ấm mãi lời ca",
    fullTitle: "Ấm mãi lời ca: tập ca cổ, nhiều tác giả",
    description: "Nhân kỷ niệm 30 năm ngày giải phóng miền Nam, thống nhất Tổ quốc (30.4.1975 - 30.4.2005), Hội Văn học nghệ thuật An Giang xin giới thiệu tập ca cổ Ấm mãi lời ca, gồm những tác phẩm viết về đề tài truyền thống của tác giả An Giang. Hầu hết tác phẩm trong tập này được hoàn thành trong Trại sáng tác kịch bản sân khấu và bài ca cổ do Hội Văn học nghệ thuật và Sở Văn hóa thông tin An Giang kết hợp tổ chức tại Soài So (Tri Tôn) năm 2004.",
    image: ammailoica,
    pdfUrl:"https://docs.google.com/document/d/19xKKbQSIoTJYUIXdTAgGG6uGS-j8eUwS0g61T0j9cI0/edit?tab=t.0",
  },
  {
    id: 6,
    title: "Ấm mãi lời ca",
    fullTitle: "Ấm mãi lời ca: tập ca cổ, nhiều tác giả",
    description: "Nhân kỷ niệm 30 năm ngày giải phóng miền Nam, thống nhất Tổ quốc (30.4.1975 - 30.4.2005), Hội Văn học nghệ thuật An Giang xin giới thiệu tập ca cổ Ấm mãi lời ca, gồm những tác phẩm viết về đề tài truyền thống của tác giả An Giang. Hầu hết tác phẩm trong tập này được hoàn thành trong Trại sáng tác kịch bản sân khấu và bài ca cổ do Hội Văn học nghệ thuật và Sở Văn hóa thông tin An Giang kết hợp tổ chức tại Soài So (Tri Tôn) năm 2004.",
    image: ammailoica,
    pdfUrl:"https://docs.google.com/document/d/19xKKbQSIoTJYUIXdTAgGG6uGS-j8eUwS0g61T0j9cI0/edit?tab=t.0",
  },
  {
    id: 7,
    title: "Ấm mãi lời ca",
    fullTitle: "Ấm mãi lời ca: tập ca cổ, nhiều tác giả",
    description: "Nhân kỷ niệm 30 năm ngày giải phóng miền Nam, thống nhất Tổ quốc (30.4.1975 - 30.4.2005), Hội Văn học nghệ thuật An Giang xin giới thiệu tập ca cổ Ấm mãi lời ca, gồm những tác phẩm viết về đề tài truyền thống của tác giả An Giang. Hầu hết tác phẩm trong tập này được hoàn thành trong Trại sáng tác kịch bản sân khấu và bài ca cổ do Hội Văn học nghệ thuật và Sở Văn hóa thông tin An Giang kết hợp tổ chức tại Soài So (Tri Tôn) năm 2004.",
    image: ammailoica,
    pdfUrl:"https://docs.google.com/document/d/19xKKbQSIoTJYUIXdTAgGG6uGS-j8eUwS0g61T0j9cI0/edit?tab=t.0",
  },
  {
    id: 8,
    title: "Ấm mãi lời ca",
    fullTitle: "Ấm mãi lời ca: tập ca cổ, nhiều tác giả",
    description: "Nhân kỷ niệm 30 năm ngày giải phóng miền Nam, thống nhất Tổ quốc (30.4.1975 - 30.4.2005), Hội Văn học nghệ thuật An Giang xin giới thiệu tập ca cổ Ấm mãi lời ca, gồm những tác phẩm viết về đề tài truyền thống của tác giả An Giang. Hầu hết tác phẩm trong tập này được hoàn thành trong Trại sáng tác kịch bản sân khấu và bài ca cổ do Hội Văn học nghệ thuật và Sở Văn hóa thông tin An Giang kết hợp tổ chức tại Soài So (Tri Tôn) năm 2004.",
    image: ammailoica,
    pdfUrl:"https://docs.google.com/document/d/19xKKbQSIoTJYUIXdTAgGG6uGS-j8eUwS0g61T0j9cI0/edit?tab=t.0",
  },
  {
    id: 9,
    title: "Ấm mãi lời ca",
    fullTitle: "Ấm mãi lời ca: tập ca cổ, nhiều tác giả",
    description: "Nhân kỷ niệm 30 năm ngày giải phóng miền Nam, thống nhất Tổ quốc (30.4.1975 - 30.4.2005), Hội Văn học nghệ thuật An Giang xin giới thiệu tập ca cổ Ấm mãi lời ca, gồm những tác phẩm viết về đề tài truyền thống của tác giả An Giang. Hầu hết tác phẩm trong tập này được hoàn thành trong Trại sáng tác kịch bản sân khấu và bài ca cổ do Hội Văn học nghệ thuật và Sở Văn hóa thông tin An Giang kết hợp tổ chức tại Soài So (Tri Tôn) năm 2004.",
    image: ammailoica,
    pdfUrl:"https://docs.google.com/document/d/19xKKbQSIoTJYUIXdTAgGG6uGS-j8eUwS0g61T0j9cI0/edit?tab=t.0",
  }
];

const ITEMS_PER_PAGE = 7;

function ListOfBooks() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedBook, setSelectedBook] = useState(bookList[0]);

  const totalPages = Math.ceil(bookList.length / ITEMS_PER_PAGE);
  const visibleBooks = bookList.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <div className={clsx(styles.ListOfBooks)}>
      <div className={clsx(styles.ListOfBooks__sidebar)}>
        <h3 className={clsx(styles.ListOfBooks__title)}>Danh sách đầu sách</h3>
        <ul className={clsx(styles.ListOfBooks__list)}>
          {visibleBooks.map((book) => (
            <li
              key={book.id}
              className={clsx(styles.ListOfBooks__listItem, {
                [styles["ListOfBooks__listItem--active"]]: selectedBook?.id === book.id,
              })}
              onClick={() => setSelectedBook(book)}
            >
              {book.title}
            </li>
          ))}
        </ul>

        <div className={clsx(styles.ListOfBooks__pagination)}>
          {Array.from({ length: totalPages }).map((_, index) => (
            <span
              key={index}
              className={clsx(styles.dot, {
                [styles.dotActive]: currentPage === index,
              })}
              onClick={() => index !== currentPage && setCurrentPage(index)}
            ></span>
          ))}
        </div>
      </div>

      <div className={clsx(styles.BookContent)}>
        {selectedBook && (
          <>
            {/* <h2 className={clsx(styles.BookContent__title)}>
              {selectedBook.title}
            </h2> */}
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
            <iframe
              src={selectedBook.pdfUrl}
              className={clsx(styles.BookContent__pdfViewer)}
              title="PDF Viewer"
            ></iframe>
          </>
        )}
      </div>
    </div>
  );
}

export default ListOfBooks;