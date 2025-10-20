
import { xai } from '@ai-sdk/xai';
import { generateText } from 'ai';
 const { text } = await generateText({
  model: xai('grok-3'),
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});
export default function nitroAI() {
    
  return (
    <div>nitroAI</div>
  )
}




