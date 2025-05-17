
import { useState } from "react";
import { useOpenAiApi } from "@/hooks/useOpenAiApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export function ChatTest() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: 'system', content: 'You are a helpful assistant.' }
  ]);
  const { chatWithOpenAI, isLoading, error } = useOpenAiApi();

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    // Add user message to chat
    const userMessage = { role: 'user' as const, content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    
    // Get response from OpenAI
    const response = await chatWithOpenAI(updatedMessages);
    
    if (response) {
      setMessages([...updatedMessages, response]);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>OpenAI Chat Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-[400px] overflow-y-auto p-4 border rounded-lg bg-muted/10">
          {messages.slice(1).map((message, index) => (
            <div 
              key={index}
              className={`mb-4 ${
                message.role === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              <div
                className={`inline-block p-3 rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              <span>AI is thinking...</span>
            </div>
          )}
          
          {error && (
            <div className="text-destructive bg-destructive/10 p-3 rounded-lg">
              Error: {error}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <form 
          className="flex w-full gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            Send
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
