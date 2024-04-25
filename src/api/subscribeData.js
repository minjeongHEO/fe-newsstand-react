/**
 * 구독할 데이터 insert
 * @param {Object} - {pressName, logoImageSrc}
 * @returns {Object} - { result: bool, msg: 'error message' };
 */
export const insertSubscribeData = async (subscriptionData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_JSON_SERVER}/subscribe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(subscriptionData),
        });

        await response.json();

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return { result: true, msg: 'Data saved successfully.' };
    } catch (error) {
        return { result: false, msg: error.message };
    }
};

/**
 * 구독 데이터 select
 * @returns {Object} - { result: bool, msg: 'error message', data: subscribeData };
 */
export const selectAllSubscribeData = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_JSON_SERVER}/subscribe`);
        const subscribeData = await response.json();

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        return { result: true, msg: 'Data viewed successfully.', data: subscribeData };
    } catch (error) {
        return { result: false, msg: error.message };
    }
};

/**
 * 구독 해지 delete
 * @param {String} - id
 * @returns {Object} - { result: bool, msg: 'error message' };
 */
export const deleteSubscribeData = async (idToDelete) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_JSON_SERVER}/subscribe/${idToDelete}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) throw new error(`HTTP error! status: ${response.status}`);

        return { result: true, msg: 'Data deleted successfully.' };
    } catch (error) {
        return { result: false, msg: error.message };
    }
};
