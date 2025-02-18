import clsx from "clsx";
import styles from "~/styles/Pages/About/aboutSidebarBooks.module.scss";
import { useState } from "react";

const magazinesList = [
  { id: 1, title:  "Ấm mãi lời ca" },
  { id: 2, title:  "Ấm mãi lời ca"},
  { id: 3, title:  "Ấm mãi lời ca" },
  { id: 4, title:  "Ấm mãi lời ca" },
  { id: 5, title:  "Ấm mãi lời ca" },
  { id: 6, title:  "Ấm mãi lời ca" },
  { id: 7, title:  "Ấm mãi lời ca"},
  { id: 8, title:  "Ấm mãi lời ca"},
  { id: 9, title:  "Ấm mãi lời ca"},
];

const ITEMS_PER_PAGE = 7;

function ListOfMagazines() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedMagazineId, setSelectedMagazineId] = useState(null); // Lưu ID thay vì title

  const totalPages = Math.ceil(magazinesList.length / ITEMS_PER_PAGE);
  const visibleMagazines = magazinesList.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <div className={clsx(styles.ListOfMagazines)}>
      {/* Sidebar - Danh sách tạp chí */}
      <div className={clsx(styles.ListOfMagazines__sidebar)}>
        <h3 className={clsx(styles.ListOfMagazines__title)}>Danh sách tạp chí</h3>
        <ul className={clsx(styles.ListOfMagazines__list)}>
          {visibleMagazines.map((magazine) => (
            <li
              key={magazine.id}
              className={clsx(styles.ListOfMagazines__listItem, {
                [styles["ListOfMagazines__listItem--active"]]: selectedMagazineId === magazine.id,
              })}
              onClick={() => setSelectedMagazineId(magazine.id)}
              tabIndex={0} // Hỗ trợ điều hướng bàn phím
            >
              {magazine.title}
            </li>
          ))}
        </ul>

        {/* Pagination */}
        <div className={clsx(styles.ListOfMagazines__pagination)}>
          {Array.from({ length: totalPages }).map((_, index) => (
            <span
              key={index}
              className={clsx(styles.dot, {
                [styles.dotActive]: currentPage === index,
              })}
              onClick={() => setCurrentPage(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListOfMagazines;
