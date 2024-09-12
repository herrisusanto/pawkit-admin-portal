import { useQuery } from "@tanstack/react-query";
import { fetchPet, fetchPetQuestionAnswers } from "../../api/pet";
import { useAtom } from "jotai";
import { petDetailsAtom } from "./state";
import { Divider, Empty, Flex, Modal, Space, Tag, Typography } from "antd";

const PetDetails = () => {
  const [state, setState] = useAtom(petDetailsAtom);
  const { open, petId } = state;
  const { data: pet } = useQuery({
    queryKey: ["pets", petId],
    queryFn: () => fetchPet(petId as string),
    enabled: !!petId,
  });
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
      title="Pet Details"
      open={open}
      onCancel={handleCancel}
      okButtonProps={{ hidden: true }}
      cancelText="Close"
    >
      <Space direction="vertical">
        <Space direction="vertical">
          <Typography.Text className="font-bold">Pet Behaviors</Typography.Text>
          <Divider style={{ margin: 0 }} />
          <Flex wrap gap={8}>
            {pet?.predefinedBehaviors?.map((behavior) => (
              <Tag color="blue" className="capitalize text-wrap">
                {String(behavior).split("_").join(" ").toLowerCase()}
              </Tag>
            ))}
            {pet?.customBehaviors?.map((behavior) => (
              <Tag color="blue" className="capitalize text-wrap">
                {String(behavior).split("_").join(" ").toLowerCase()}
              </Tag>
            ))}
          </Flex>
        </Space>
        <Space direction="vertical">
          <Typography.Text className="font-bold">Questions</Typography.Text>
          <Divider style={{ margin: 0 }} />
          <Space size={0} direction="vertical">
            <Typography.Text>Has medical condition?</Typography.Text>
            <Typography.Text className="font-semibold">
              {pet?.hasMedicalCondition ? (
                <Tag color="green">Yes</Tag>
              ) : (
                <Tag color="red">No</Tag>
              )}
            </Typography.Text>
          </Space>
          <Space size={0} direction="vertical">
            <Typography.Text>Is microchipped?</Typography.Text>
            <Typography.Text className="font-semibold">
              {pet?.isMicrochipped ? (
                <Tag color="green">Yes</Tag>
              ) : (
                <Tag color="red">No</Tag>
              )}
            </Typography.Text>
            {pet?.microchipNumber && (
              <Space>
                <Typography.Text>Microchip number:</Typography.Text>
                <Typography.Text className="font-semibold">
                  {pet?.microchipNumber}
                </Typography.Text>
              </Space>
            )}
          </Space>
          <Space size={0} direction="vertical">
            <Typography.Text>Is neutered?</Typography.Text>
            <Typography.Text className="font-semibold">
              {pet?.isNeutered ? (
                <Tag color="green">Yes</Tag>
              ) : (
                <Tag color="red">No</Tag>
              )}
            </Typography.Text>
          </Space>
          {(questionAnswers?.length || 0) > 0 ? (
            questionAnswers?.map((qa) => (
              <Space size={0} direction="vertical">
                <Typography.Text>{qa.question.questionString}</Typography.Text>
                <Typography.Text className="font-semibold">
                  {qa.answer === "true" ? (
                    <Tag color="green">Yes</Tag>
                  ) : qa.answer === "false" ? (
                    <Tag color="red">No</Tag>
                  ) : (
                    <Tag color="blue" className="text-wrap">
                      {qa.answer}
                    </Tag>
                  )}
                </Typography.Text>
              </Space>
            ))
          ) : (
            <Empty />
          )}
        </Space>
      </Space>
    </Modal>
  );
};

export default PetDetails;
