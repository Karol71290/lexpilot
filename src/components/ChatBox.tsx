
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useChatApi, ChatMessage } from "@/hooks/useChatApi";
import { Send, Loader2 } from "lucide-react";

export function ChatBox() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const { sendChatRequest, isLoading, error } = useChatApi();

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: ChatMessage = { role: "user", content: input };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput("");

    // Send to API
    const updatedMessages = [...messages, userMessage];
    const response = await sendChatRequest(updatedMessages);

    // Add AI response if we got one
    if (response) {
      setMessages(prevMessages => [...prevMessages, response]);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Chat with OpenAI</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-[400px] overflow-y-auto space-y-4 p-4 border rounded-md">
          {messages.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Start a conversation with the AI assistant.
            </p>
          ) : (
            messages.map((message, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-lg ${
                  message.role === "user" 
                    ? "ml-auto bg-primary text-primary-foreground max-w-[80%]" 
                    : "mr-auto bg-muted max-w-[80%]"
                }`}
              >
                <p className="text-sm font-medium">
                  {message.role === "user" ? "You" : "AI Assistant"}
                </p>
                <p className="mt-1 break-words whitespace-pre-wrap">{message.content}</p>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          )}
          {error && (
            <div className="p-3 bg-destructive/10 text-destructive rounded-lg">
              <p className="font-medium">Error:</p>
              <p>{error}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center space-x-2">
          <Textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={isLoading || !input.trim()} 
            size="icon"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
