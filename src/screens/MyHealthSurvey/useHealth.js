import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { healthSurveys } from "../../redux/actions/user.action";

const useHealth = () => {

    const dispatch = useDispatch();
    const language = useSelector((state) => state?.auth?.language)
    // const CHECKERR = useSelector((state) => state?.auth?.questionar)

    const [loading, setLoading] = useState(false);

    const _getSurvey = async () => {
        const mydata = await dispatch(healthSurveys(language, setLoading));
        // const my = mydata?.data?.data?.filter(data => data.is_completed == false);
        // const myComple = mydata?.data?.data?.filter(
        //     data => data.is_completed == true,
        // );

        // const kjkkjk = mydata?.data?.data?.filter(obj => CHECKERR.includes(obj?._id));
        // const notKHKH = mydata?.data?.data?.filter(obj => !CHECKERR.includes(obj?._id));
        // const lkl55 = notKHKH?.filter(obj => !clickedIds.includes(obj?._id))
        // setdattta(lkl55);
        // setCompleted(kjkkjk);
    };

    return {
        _getSurvey,
        loading
    }
}

export default useHealth