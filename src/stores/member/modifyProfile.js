import axios from 'axios';

export async function modifyProfile(nickname, introduction, language, file) {
    try {
        const formData = new FormData();

        // 파일이 선택된 경우에만 추가
        if (file) {
            formData.append('file', file);
        }

        // JSON 데이터를 Blob으로 추가
        formData.append(
            'vo',
            new Blob(
                [
                    JSON.stringify({
                        nickname,
                        introduction,
                        language,
                    }),
                ],
                { type: 'application/json' }
            )
        );

        const jwtToken = localStorage.getItem('jwtToken');

        const response = await axios.put(
            'http://localhost:8080/api/v1/member/profile',
            formData,
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    'Content-Type': 'multipart/form-data', // Content-Type 설정
                },
            }
        );

        alert('프로필이 성공적으로 수정되었습니다!');
        return response.data.result;
    } catch (error) {
        console.error('프로필 수정 실패:', error);
        alert('프로필 수정에 실패했습니다. 다시 시도해 주세요.');
        throw error;
    }
}
