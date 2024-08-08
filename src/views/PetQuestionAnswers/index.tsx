import { useQuery } from "@tanstack/react-query";
import { fetchPetQuestionAnswers } from "../../api/pet";
import { useAtom } from "jotai";
import { petQuestionAnswersAtom } from "./state";
import { Empty, Modal, Space, Typography } from "antd";

const PetQuestionAnswers = () => {
  const [state, setState] = useAtom(petQuestionAnswersAtom);
  const { open, petId } = state;
  const { data: questionAnswers } = useQuery({
    queryKey: ["question_answers", petId],
    queryFn: () => fetchPetQuestionAnswers({ petId: petId as string }),
    enabled: !!petId,
  });

  const handleCancel = () => {
    setState({ open: false, petId: null });
  };

  return (
    <Modal
      title="Questions"
      open={open}
      onCancel={handleCancel}
      okButtonProps={{ hidden: true }}
      cancelText="Close"
    >
      {(questionAnswers?.length || 0) > 0 ? (
        questionAnswers?.map((qa) => (
          <Space direction="vertical">
            <Typography.Text>{qa.question.questionString}</Typography.Text>
            <Typography.Text>{qa.answer}</Typography.Text>
          </Space>
        ))
      ) : (
        <Empty />
      )}
    </Modal>
  );
};

export default PetQuestionAnswers;
