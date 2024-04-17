import styles from './LineNews.module.scss';

//test
export default function LineNews({ props }) {
    return (
        <div className={`styles.headline__contents styles.section${props}`}>
            <div className={styles.headline__press_name}>
                <div className={styles.headline__rolling_box}>
                    <div className={styles.pre_text}>
                        <a href="https://news.naver.com/main/list.naver?mode=LPOD&mid=sec&sid1=001&sid2=140&oid=001&isYeonhapFlash=Y" target="_blank">
                            연합뉴스
                        </a>
                    </div>
                    <div className={styles.cur_text}>
                        <a href="https://news.naver.com/main/list.naver?mode=LPOD&mid=sec&sid1=001&sid2=140&oid=001&isYeonhapFlash=Y" target="_blank">
                            연합뉴스
                        </a>
                    </div>
                    <div className={styles.next_text}>
                        <a href="https://news.naver.com/main/list.naver?mode=LPOD&mid=sec&sid1=001&sid2=140&oid=001&isYeonhapFlash=Y" target="_blank">
                            연합뉴스
                        </a>
                    </div>
                </div>
            </div>
            <div className={styles.headline__news}>
                <div className={styles.headline__rolling_box}>
                    <div className={styles.pre_text}>
                        <a
                            href="https://news.naver.com/main/list.naver?mode=LPOD&mid=sec&sid1=001&sid2=140&oid=001&isYeonhapFlash=Y&aid=0014558087"
                            target="_blank"
                        >
                            의협 "교수에 진료유지명령 내리면 의료시스템 존립 불가능할 것"
                        </a>
                    </div>
                    <div className={styles.cur_text}>
                        <a
                            href="https://news.naver.com/main/list.naver?mode=LPOD&mid=sec&sid1=001&sid2=140&oid=001&isYeonhapFlash=Y&aid=0014558054"
                            target="_blank"
                        >
                            與현역 한기호·강대식·김형동·이용 경선승리…하태경 낙천
                        </a>
                    </div>
                    <div className={styles.next_text}>
                        <a
                            href="https://news.naver.com/main/list.naver?mode=LPOD&mid=sec&sid1=001&sid2=140&oid=001&isYeonhapFlash=Y&aid=0014558025"
                            target="_blank"
                        >
                            與선대위 한동훈 총괄…나경원 안철수 원희룡 윤재옥 공동체제
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
