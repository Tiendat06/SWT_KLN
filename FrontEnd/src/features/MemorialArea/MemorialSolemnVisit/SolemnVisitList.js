import {Carousel} from "primereact/carousel";
import {next_icon_1, previous_icon_1} from "~/assets/img";
import {useEffect, useState} from "react";
import {getSolemnVisitListService} from "~/services/SolemnVisitService";
import clsx from "clsx";
import styles from '~/styles/Pages/Memorial/memorialSolemnVisit.module.scss';

const SolemnVisitList = () => {
    const [solemnVisitList, setSolemnVisitList] = useState([]);

    useEffect(() => {
        const getSolemnVisitList = async () => {
            const data = await getSolemnVisitListService(0, 1);
            setSolemnVisitList(data?.data?.items);
        }
        getSolemnVisitList();
    }, []);

    // const responsiveOptions = [
    //     { breakpoint: '1024px', numVisible: 4, numScroll: 1 },
    //     { breakpoint: '768px', numVisible: 4, numScroll: 1 },
    //     { breakpoint: '560px', numVisible: 1, numScroll: 1 },
    // ]
    //
    // const solemnVisitTemplate = solemnVisit => {
    //
    //     return (
    //         <div className={clsx(styles['solemn-visit'],
    //             "d-flex flex-wrap justify-content-center mt-5")}>
    //             <h1 className={clsx(styles["solemn-visit__title"], "col-lg-12 col-md-12 col-sm-12 text-center mb-0")}>{solemnVisit?.solemnVisitName}</h1>
    //             <div style={{
    //
    //             }} className={clsx(styles["solemn-visit__content"], "d-flex flex-wrap justify-content-center")}>
    //                 <div style={{
    //                     width: "90%"
    //                 }} className={clsx(styles["solemn-visit__content--inner"],
    //                     "d-flex flex-wrap justify-content-center align-items-center col-lg-12 col-md-12 col-sm-12")}>
    //                     <div className="col-lg-6 col-md-6 col-sm-6">
    //                         <img style={{
    //                             width: "70%",
    //                         }} src={solemnVisit?.portraitImage} alt=""/>
    //                     </div>
    //                     <div className="col-lg-6 col-md-6 col-sm-6">
    //                         <img style={{
    //                             width: "100%",
    //                         }} src={solemnVisit?.letterImage} alt=""/>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }

    return (
        <>
            {solemnVisitList?.map((solemnVisit, index) => (
                <div className={clsx(styles['solemn-visit'],
                    "d-flex flex-wrap justify-content-center mt-5")}>
                    <h1 className={clsx(styles["solemn-visit__title"], "col-lg-12 col-md-12 col-sm-12 text-center mb-0")}>{solemnVisit?.solemnVisitName}</h1>
                    <div style={{

                    }} className={clsx(styles["solemn-visit__content"], "d-flex flex-wrap justify-content-center")}>
                        <div style={{
                            width: "90%",
                            height: "90%",
                        }} className={clsx(styles["solemn-visit__content--inner"],
                            "d-flex flex-wrap justify-content-center align-items-center col-lg-12 col-md-12 col-sm-12")}>
                            <div className="col-lg-6 col-md-6 col-sm-6 d-flex justify-content-center">
                                <img style={{
                                    width: "70%",
                                }} src={solemnVisit?.portraitImage} alt=""/>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 h-100">
                                <img style={{
                                    width: "100%",
                                    height: "100%"
                                }} src={solemnVisit?.letterImage} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {/*<Carousel value={solemnVisitList}*/}
            {/*          numVisible={1}*/}
            {/*          numScroll={1}*/}
            {/*          responsiveOptions={responsiveOptions}*/}
            {/*          className="custom-carousel"*/}
            {/*          circular={true}*/}
            {/*          autoplayInterval={3000}*/}
            {/*          showNavigators={true}*/}
            {/*          showIndicators={false}*/}
            {/*          nextIcon={<img src={`${next_icon_1}`} alt="Next" style={{width: "30px", height: "30px"}}/>}*/}
            {/*          prevIcon={<img src={`${previous_icon_1}`} alt="Previous" style={{width: "30px", height: "30px"}}/>}*/}
            {/*          itemTemplate={solemnVisitTemplate}/>*/}
        </>
    )
}

export default SolemnVisitList;