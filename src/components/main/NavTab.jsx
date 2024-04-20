import React from 'react';
import styles from './NavTab.module.scss';

export default function NavTab({ setOnClick, tabType }) {
    return (
        <div className={styles.nav__container}>
            <div className={styles.nav__container__press}>
                <div
                    className={`${styles['nav__press-contents']} ${tabType.subscribe === 'all' ? styles['contents-select'] : ''}`}
                    id="all-press-tab"
                    onClick={setOnClick}
                >
                    전체 언론사
                </div>
                <div
                    className={`${styles['nav__press-contents']}  ${tabType.subscribe === 'my' ? styles['contents-select'] : ''}`}
                    id="my-press-tab"
                    onClick={setOnClick}
                >
                    내가 구독한 언론사
                </div>
            </div>
            <div className={styles.nav__container__view_type}>
                <div id="list-tab" onClick={setOnClick}>
                    <svg width={30} height={30} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            className={`${tabType.view === 'list' ? styles['grid-option-select'] : styles['grid-option']}`}
                            d="M19 5V19H5V5H19ZM20.1 3H3.9C3.4 3 3 3.4 3 3.9V20.1C3 20.5 3.4 21 3.9 21H20.1C20.5 21 21 20.5 21 20.1V3.9C21 3.4 20.5 3 20.1 3ZM11 7H17V9H11V7ZM11 11H17V13H11V11ZM11 15H17V17H11V15ZM7 7H9V9H7V7ZM7 11H9V13H7V11ZM7 15H9V17H7V15Z"
                            id="list-view-tab"
                        />
                    </svg>
                </div>
                <div id="grid-tab" onClick={setOnClick}>
                    <svg width={30} height={30} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            className={`${tabType.view === 'grid' ? styles['grid-option-select'] : styles['grid-option']}`}
                            d="M3 11V3H11V11H3ZM3 21V13H11V21H3ZM13 11V3H21V11H13ZM13 21V13H21V21H13ZM5 9H9V5H5V9ZM15 9H19V5H15V9ZM15 19H19V15H15V19ZM5 19H9V15H5V19Z"
                            id="grid-view-tab"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}
