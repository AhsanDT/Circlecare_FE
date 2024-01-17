import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { completeDailyTask, dailyTasks, removeDailyTask } from "../../redux/actions/user.action";
import { DAILY_ARTICLES, DAILY_VIDEOS } from "../../redux/const/const";

const useDaily = () => {
    const dispatch = useDispatch();
    const dailyArticles = useSelector(state => state.health.daily_articles)
    const dailyVideos = useSelector(state => state.health.daily_videos)
    const language = useSelector((state) => state?.auth?.language)
    const profile = useSelector((state) => state?.auth?.profile)

    const [loading, setLoading] = useState(false);

    const _getDaily = async (body) => {
        dispatch(dailyTasks(body, language, profile?.score, setLoading));
    };

    const _handleSwipeToDelete = async (task) => {
        const updatedArticles = dailyArticles?.filter(f => f.task_id !== task?.task_id)
        const updatedVideos = dailyVideos?.filter(f => f.task_id !== task?.task_id)
        let response = await dispatch(removeDailyTask(task?.task_id))
        if (response) {
            dispatch({ type: DAILY_ARTICLES, payload: updatedArticles });
            dispatch({ type: DAILY_VIDEOS, payload: updatedVideos });
        }
    };

    const _handleSwipeToComplete = async (task, setSuccess) => {
        const updatedArticles = dailyArticles?.map(article => {
            if (article?.task_id === task?.task_id) {
                return { ...article, is_completed: true };
            }
            return article;
        });
        const updatedVideos = dailyArticles?.map(article => {
            if (article?.task_id === task?.task_id) {
                return { ...article, is_completed: true };
            }
            return article;
        });

        let response = await dispatch(completeDailyTask(task?.task_id, setSuccess))
        if (response) {
            dispatch({ type: DAILY_ARTICLES, payload: updatedArticles });
            dispatch({ type: DAILY_VIDEOS, payload: updatedVideos });
        }
    };

    return {
        _getDaily,
        _handleSwipeToDelete,
        _handleSwipeToComplete,
        loading
    }
}

export default useDaily