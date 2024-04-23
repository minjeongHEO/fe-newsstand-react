/**
 * 구독할 데이터 insert
 * @param {Object} - {pressName, logoImageSrc}
 * @returns {Object} - { result: bool, msg: 'error message' };
 */
export const insertSubscribeData = async (subscriptionData) => {
    let insertResult = { result: false, msg: '' };

    const response = await fetch(`${import.meta.env.VITE_JSON_SERVER}/subscribe`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriptionData),
    });

    await response.json();

    // 저장 성공 여부 확인
    if (response.ok) insertResult = { result: true, msg: 'Data saved successfully.' };
    else insertResult = { result: false, msg: 'Data save failure.' };

    return insertResult;
};

/**
 * 구독 데이터 select
 * @returns {Object} - { result: bool, msg: 'error message', data: subscribeData };
 */
export const selectAllSubscribeData = async () => {
    let insertResult = { result: false, msg: '', data: '' };

    const response = await fetch(`${import.meta.env.VITE_JSON_SERVER}/subscribe`);
    const subscribeData = await response.json();

    // 조회 성공 여부 확인
    if (response.ok) insertResult = { result: true, msg: 'Data viewed successfully.', data: subscribeData };
    else insertResult = { result: false, msg: 'Data viewed failure.' };

    return insertResult;
};
