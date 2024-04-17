import styles from './HeadLine.module.scss';
import useNewsData from '../../hooks/useNewsdata';

export default function HeadLine() {
    const [newsData, error] = useNewsData({ type: 'headline' });

    return (
        <section className={styles.main__section__headline}>
            <div className={styles.headline__container}></div>
        </section>
    );
}

// return (
//     <div className="headline__contents section1">
//         <div className="headline__press_name">
//             <div className="headline__rolling_box">
//                 <div className="pre_text text_move_up">
//                     <a href="https://news.naver.com/main/list.naver?mode=LPOD&mid=sec&sid1=001&sid2=140&oid=001&isYeonhapFlash=Y" target="_blank">
//                         연합뉴스
//                     </a>
//                 </div>
//                 <div className="cur_text text_move_up">
//                     <ay href="https://news.naver.com/main/list.naver?mode=LPOD&mid=sec&sid1=001&sid2=140&oid=001&isYeonhapFlash=Y" target="_blank">
//                         연합뉴스
//                     </ay>
//                 </div>
//                 <div className="next_text text_move_up">
//                     <a href="https://news.naver.com/main/list.naver?mode=LPOD&mid=sec&sid1=001&sid2=140&oid=001&isYeonhapFlash=Y" target="_blank">
//                         연합뉴스
//                     </a>
//                 </div>
//             </div>
//         </div>
//         <div className="headline__news">
//             <div className="headline__rolling_box">
//                 <div className="pre_text text_move_up">
//                     <a
//                         href="https://news.naver.com/main/list.naver?mode=LPOD&mid=sec&sid1=001&sid2=140&oid=001&isYeonhapFlash=Y&aid=0014558087"
//                         target="_blank"
//                     >
//                         의협 "교수에 진료유지명령 내리면 의료시스템 존립 불가능할것"
//                     </a>
//                 </div>
//                 <div className="cur_text text_move_up">
//                     <a
//                         href="https://news.naver.com/main/list.naver?mode=LPOD&mid=sec&sid1=001&sid2=140&oid=001&isYeonhapFlash=Y&aid=0014558054"
//                         target="_blank"
//                     >
//                         與현역 한기호·강대식·김형동·이용 경선승리…하태경 낙천
//                     </a>
//                 </div>
//                 <div className="next_text text_move_up">
//                     <a
//                         href="https://news.naver.com/main/list.naver?mode=LPOD&mid=sec&sid1=001&sid2=140&oid=001&isYeonhapFlash=Y&aid=0014558025"
//                         target="_blank"
//                     >
//                         與선대위 한동훈 총괄…나경원 안철수 원희룡 윤재옥 공동체제
//                     </a>
//                 </div>
//             </div>
//         </div>
//     </div>
// );
