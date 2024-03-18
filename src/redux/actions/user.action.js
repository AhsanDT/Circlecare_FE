import * as types from '../const/const';
import instance from '../../config/httpservice';
import { showError, showSuccess } from '../../helper/customToast';
import moment from 'moment';

const dataToFormData = data => {
  const formData = new FormData()
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const element = data[key]
      formData.append(key, element)
    }
  }

  return formData
}

// *************************** Profile ************************************
export const GetProfile = () => async dispatch => {
  try {
    const response = await instance.get(`/appuser/app-user`);
    dispatch({ type: types.PROFILE, payload: response.data.data });
  } catch (error) {
    console.log(JSON.stringify(error));
  }
};

export const UpdateProfile = (data, navigation, setLoading, setSuccess) => async dispatch => {
  try {
    setLoading(true)
    const response = await instance.put(`/appuser/app-user`, data);
    if (response) {
      dispatch({ type: types.PROFILE, payload: response?.data?.data });
      setSuccess(true)
      setTimeout(() => {
        navigation.navigate('Tab2');
      }, 2000);
    }
  } catch (error) {
    showError(error?.response?.data?.error || "Something went wrong!");
    console.log(JSON.stringify(error));
  } finally {
    setLoading(false)
  }
};

export const uploadAvatar = (imageData, setSuccess) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  }

  try {
    const formData = new FormData();
    formData.append('file', {
      uri: imageData,
      type: 'image/jpeg',
      name: 'profile-picture'
    });

    const response = await instance.patch('/appuser/app-user-update-avatar', formData, config);

    if (response) {
      setSuccess(true)
    }
  } catch (error) {
    showError(error?.response?.msg || error?.response?.data?.error || 'Something went wrong!')
    console.log("Error profile avatart", JSON.stringify(error));
  }
};

export const appUserDelete = (setLoading, logout) => async dispatch => {
  try {
    setLoading(true)
    await instance.delete(`/appuser/app-user-delete/`);
    dispatch({ type: types.LOG_OUT });
    await logout();
    return true;
  } catch (error) {
    showError(error?.response?.msg || error?.response?.data?.error || 'Something went wrong!')
    console.log(JSON.stringify(error?.response));
  } finally {
    setLoading(false)
  }
};

export const ChangePassword = (data, navigation, setLoading, setSuccess) => async dispatch => {
  try {
    setLoading(true)
    const response = await instance.patch(`/appuser/app-user`, data);
    if (response) {
      setSuccess(true)
      setTimeout(() => {
        navigation.navigate('Tab2');
      }, 2000);
    }
  } catch (error) {
    showError(error?.response?.data?.error || "Something went wrong!");
    console.log("Error in change password", JSON.stringify(error));
  } finally {
    setLoading(false)
  }
};

export const Questions = (id) => async dispatch => {
  try {
    const response = await instance.get(`/appuser/health-survey/${id}`);
    if (response) {
      return response;
    }
  } catch (error) {
    console.log(JSON.stringify(error));
  }
};

export const deleteReflection = (Id) => async dispatch => {

  try {
    const response = await instance.delete(`/appuser/daily-reflection/${Id}`);
    if (response) {

    }
  } catch (error) {
    console.log(JSON.stringify(error?.response));
  }
};

// *************************** Health Survey ************************************
export const healthSurveys = (language = 'English', setLoading = () => null) => async dispatch => {
  try {
    setLoading(true)
    const response = await instance.get(
      `/appuser/health-surveys?content_type=${language}`,
    );
    if (response) {
      dispatch({
        type: types.SURVEY,
        payload: response?.data?.data,
      });
      return response;
    }
  } catch (error) {
    showError(error?.response?.msg || error?.response?.data?.error || 'Something went wrong!')
    console.log("Error in health suryes api ===>", JSON.stringify(error));
  } finally {
    setLoading(false)
  }
};
export const updateSurvey = (id, body, setLoading) => async dispatch => {
  try {
    setLoading(true)
    const response = await instance.post(`/appuser/health-survey/${id}`, body);
    if (response) {
      showSuccess("Survey Completed Successfully!")
      return response;
    }
  } catch (error) {
    showError(error?.response?.data?.error || "Something went wrong!");
    console.log(JSON.stringify(error));
  } finally {
    setLoading(false)
  }
}

// *************************** Today Engagement ************************************
export const dailyTasks = (body, language = 'English', score = 0, setLoading = () => null) => async dispatch => {
  const { taskType, from_date, to_date } = body;
  try {
    setLoading(true)

    const queryParams = new URLSearchParams({
      task_type: taskType,
      content_type: language,
      score: score.toString(),
      // from_date: from_date || '',
      // to_date: to_date || '',
    });

    const url = `/appuser/daily-tasks?${queryParams.toString()}`;
    console.log("URL ====> ", url);
    const response = await instance.get(url);

    // old way
    // const url = `/appuser/daily-tasks?task_type=${taskType}&content_type=${language}&score=${score}`;
    // const fullUrl = date ? `${url}&to_date=${date}` : url;
    // const finalUrl = fromDate ? `${fullUrl}&from_date=${fromDate}` : fullUrl;
    // const response = await instance.get(finalUrl);

    if (response) {
      dispatch({
        type: taskType == "Article" ? types.DAILY_ARTICLES : types.DAILY_VIDEOS,
        payload: response?.data?.data,
      });
      return response;
    }
  } catch (error) {
    showError(error?.response?.data?.error || "Something went wrong!");
    console.log(JSON.stringify(error));
  } finally {
    setLoading(false)
  }
};
export const readDailyTaskArticle = (articleId, setLoading) => async dispatch => {
  try {
    setLoading(true)
    const response = await instance.get(`/appuser/articles/${articleId}`);
    return response;
  } catch (error) {
    showError(error?.response?.data?.error || "Something went wrong!");
    console.log(JSON.stringify(error));
  } finally {
    setLoading(false)
  }
};
export const completeDailyTask = (id, setSuccess) => async dispatch => {
  try {
    const response = await instance.patch(`/appuser/complete-task/${id}`);
    if (response) {
      setSuccess(true);
      return response
    }
  } catch (error) {
    showError(error?.response?.data?.error || "Complete task fail!");
    console.log(JSON.stringify(error?.response));
  }
};
export const removeDailyTask = (id) => async dispatch => {
  try {
    const response = await instance.patch(`/appuser/remove-task/${id}`);
    if (response) {
      return response
    }
  } catch (error) {
    console.log(JSON.stringify(error?.response));
  }
};
export const getDailyTask = body => async dispatch => {
  try {
    const response = await instance.get(
      `/appuser/daily-tasks?from_date=${body?.date1}&to_date=${body?.date2}&task_type=Article&content_type=English`,
    );
    if (response) {
      return response;
    }
    // alert("hogya")
  } catch (error) {
    console.log(JSON.stringify(error?.response));
  }
};

// *************************** Discover ************************************
export const Disover = (language = 'English', articleType = 'Article', score = 0, setLoading = () => null) => async dispatch => {
  try {
    setLoading(true)
    const url = `/appuser/articles?content_type=${language}&article_type=${articleType}&score=${score}`;
    const response = await instance.get(url);

    if (response) {
      dispatch({
        type: articleType == "Article" ? types.DISCOVER_ARTICLES : types.DISCOVER_VIDEOS,
        payload: response?.data?.data,
      });
      return response;
    }
  } catch (error) {
    showError(error?.response?.data?.error || "Something went wrong!");
    console.log(JSON.stringify(error));
  } finally {
    setLoading(false)
  }
};

// *************************** Care ************************************
export const cares = (language = 'English', setLoading = () => null) => async dispatch => {
  try {
    setLoading(true)
    const response = await instance.get(`/appuser/cares?content_type=${language}`);
    if (response) {
      dispatch({
        type: types.CARE,
        payload: response?.data?.data,
      });
      return response;
    }
  } catch (error) {
    showError(error?.response?.data?.error || "Something went wrong!");
    console.log(JSON.stringify(error));
  } finally {
    setLoading(false)
  }
};
export const CareMarkAsDone = (id, language = 'English') => async dispatch => {
  try {
    const response = await instance.post(`/appuser/care-mark-as-done/${id}`);
    if (response) {
      dispatch(cares(language))
      return response;
    }
  } catch (error) {
    console.log("CareMarkAsDone Error ==> ", JSON.stringify(error) || 'Something went wrong!');
  }
};

// *************************** My Record & Progress ************************************
export const post_Records_of_health = (data, setLoading, setSuccess) => async dispatch => {
  try {
    setLoading(true)
    const response = await instance.post(`/appuser/myrecords`, data);
    if (response) {
      setSuccess(true)
      return response
    }
  } catch (error) {
    showError(error?.response?.data?.error || "Something went wrong!");
    console.log(JSON.stringify(error));
  } finally {
    setLoading(false)
  }
};
export const get_Records_of_health = filters => async dispatch => {
  try {
    const queryParams = new URLSearchParams(filters).toString()
    const response = await instance.get(`/appuser/myrecords?${queryParams}`);
    if (response) {
      return response;
    }
  } catch (error) {
    console.log(JSON.stringify(error));
  }
};

// Pain scale
export const get_Records_Body = (setLoading) => async dispatch => {
  var currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 7);

  const filters = {
    from_date: moment(currentDate).format('YYYY-MM-DD'),
    till_date: moment(new Date).format('YYYY-MM-DD')
  }

  const queryParams = new URLSearchParams(filters).toString()
  try {
    setLoading(true)
    const response = await instance.get(`/appuser/pain-assessment?${queryParams}`);
    if (response) {
      return response;
    }
  } catch (error) {
    console.log(JSON.stringify(error));
  } finally {
    setLoading(false)
  }
};
export const painscaleSet = (data, setLoading, navigation) => async dispatch => {
  try {
    setLoading(true)
    const response = await instance.post(`/appuser/pain-assessment`, data);
    if (response) {
      navigation.navigate('Records');
    }
  } catch (error) {
    showError(error?.response?.msg || error?.response?.data?.error || 'Something went wrong!')
    console.log(JSON.stringify(error?.response));
  } finally {
    setLoading(false)
  }
};

// *************************** Daily Reflaction ************************************
export const setreflection = (data, setLoading, setSuccess, navigation) => async dispatch => {
  try {
    setLoading(true)
    const response = await instance.post(`/appuser/daily-reflection`, data);
    if (response) {
      setSuccess(true)

      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    }
  } catch (error) {
    showError(error?.response?.msg || error?.response?.data?.error || 'Something went wrong!')
    console.log(JSON.stringify(error?.response));
  } finally {
    setLoading(false)
  }
};
export const getreflection = (filters, setLoading) => async dispatch => {
  try {
    setLoading(true)
    const queryParams = new URLSearchParams(filters).toString()
    const response = await instance.get(`/appuser/daily-reflections?${queryParams}`);
    if (response) {
      return response;
    }
  } catch (error) {
    showError(error?.response?.msg || error?.response?.data?.error || 'Something went wrong!')
    console.log(JSON.stringify(error?.response));
  } finally {
    setLoading(false)
  }
};


// *************************** Support Chat ************************************
export const getChat = (id, setLoading) => async dispatch => {
  try {
    // setLoading(true)
    const response = await instance.get(`/chat/userChat/${id}`);
    return response;
  } catch (error) {
    showError(error?.response?.msg || error?.response?.data?.error || 'Something went wrong!')
    console.log(JSON.stringify(error?.response));
  } finally {
    // setLoading(false)
  }
};
export const accessChat = (data) => async dispatch => {
  try {
    const response = await instance.post(`/chat/accessChatsApp`, data);
    dispatch({
      type: types.SUPPORT,
      payload: response.data,
    });
    return response;
  } catch (error) {
    showError(error?.response?.msg || error?.response?.data?.error || 'Something went wrong!')
    console.log(JSON.stringify(error?.response));
  }
};
export const uploadChatImage = (data, setLoading) => async dispatch => {
  const config = {
    header: { 'Content-Type': 'multipart/form-data' }
  }

  try {
    setLoading(true)
    const formData = new FormData();
    formData.append('file', {
      uri: data.uri,
      type: 'image/jpeg',
      name: 'chat.jpg',
    });

    const response = await instance.post(`/chat/sendFile`, formData, config);
    return response;
  } catch (error) {
    showError(
      error?.response?.msg ||
      error?.response?.data?.error ||
      'Something went wrong!',
    );
    console.log(JSON.stringify(error?.response));
  } finally {
    setLoading(false)
  }
};


// *************************** Support Chat ************************************
export const getNotifications = (setLoading = () => null) => async dispatch => {
  try {
    setLoading(true)
    const response = await instance.get(`/appuser/notification/`);
    dispatch({ type: types.NOTIFICATIONS, payload: response?.data?.data || [] })
    return response;
  } catch (error) {
    showError(error?.response?.msg || error?.response?.data?.error || 'Something went wrong!')
    console.log(JSON.stringify(error?.response));
  } finally {
    setLoading(false)
  }
}

export const readNotification = (notificationId) => async dispatch => {
  try {
    const response = await instance.patch(`/appuser/notification-read/${notificationId}`);
    return response;
  } catch (error) {
    console.log("Error in read notification ==> ", error);
  }
}