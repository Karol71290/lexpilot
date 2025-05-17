
import { AppLayout } from "@/components/AppLayout";
import { ChatBox } from "@/components/ChatBox";

const ChatTest = () => {
  return (
    <AppLayout title="OpenAI Chat Test">
      <div className="container py-6">
        <h1 className="text-2xl font-bold mb-6">Test OpenAI Integration</h1>
        <p className="mb-6 text-muted-foreground">
          This page tests the connection to OpenAI using GPT-4 as the default model.
          Messages are processed securely through Supabase Edge Functions.
        </p>
        <ChatBox />
      </div>
    </AppLayout>
  );
};

export default ChatTest;
