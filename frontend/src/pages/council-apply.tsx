import {
  Card,
  Divider,
  Textarea,
  Progress,
  Button,
  Input,
} from "@chakra-ui/react";

function CouncilApply() {
  return (
    <div className="h-full">
      <div className="mt-8 w-1/2 mx-auto">
        <Card className="my-8 p-8 mx-auto justify-center">
          <h1 className="text-3xl font-semibold text-left justify-center">
            Action: Council Candidacy
          </h1>
          <Divider colorScheme="gray" className="my-4" />
          <h1 className="text-xl font-semibold text-left justify-center mt-2">
            Why should we choose you?
          </h1>
          <div className="w-full p-2 bg-transparent mt-2">
            <Textarea
              className="text-md font-medium text-left"
              rows={4}
              variant="outline"
              borderColor="gray"
              placeholder="Write about yourself..."
            />
          </div>
          <h1 className="text-xl font-semibold text-left justify-center mt-4">
            Relevant Links:
          </h1>
          <div className="w-full p-2 bg-transparent mt-1">
            <Input
              className="text-md w-fullfont-medium text-left"
              variant="outline"
              borderColor="gray"
              placeholder="Github / LinkedIn / Website..."
            />
          </div>
          <h1 className="text-xl font-semibold text-left justify-center mt-4">
            Upload Documents:
          </h1>
          <div className="w-full p-2 bg-transparent mt-1">
            <input
              className="w-full text-lg text-gray-400 border border-gray-500 rounded-lg cursor-pointer bg-gray-50"
              id="large_size"
              type="file"
            />
            <p
              className="mt-1 text-sm text-gray-500 dark:text-gray-300"
              id="file_input_help"
            >
              Accepted Format: .docx, .pdf, .jpg, .png
            </p>
          </div>
          <h1 className="text-xl font-semibold text-center justify-center mt-8">
            Self-bond Amount: 100 $APE
          </h1>
          <Button
            bg="black"
            color="white"
            _hover={{ opacity: 0.7 }}
            className="w-1/2 mx-auto my-6 items-center text-center justify-center"
          >
            Submit Candidacy
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default CouncilApply;
