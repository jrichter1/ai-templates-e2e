import { AITemplate } from "../suite/types"
import { PlaywrightSuite } from "./types"
import { ChatbotTest } from './suite/chatbot';
import { AudioToTextTest } from "./suite/audio";
import { CodegenTest } from "./suite/codegen";
import { ObjectDetectionTest } from "./suite/objects";
import { RAGSuite } from "./suite/rag";

export const loadPlaywrightSuite: (template: AITemplate) => PlaywrightSuite = (template: AITemplate) => {
  switch (template) {
    case 'chatbot': {
      return new ChatbotTest();
    }
    case 'audio-to-text': {
      return new AudioToTextTest();
    }
    case 'codegen': {
      return new CodegenTest();
    }
    case 'object-detection': {
      return new ObjectDetectionTest();
    }
    case 'rag': {
      return new RAGSuite();
    }
    default: {
      return new EmptySuite();
    }
  }
}

class EmptySuite implements PlaywrightSuite {
  appTest(name: string, namespace: string) {
    return;
  }
}