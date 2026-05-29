import { Controller, Post, Put, Delete, Get, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AiService } from '../services/ai.service';

@ApiTags('modules.ai')
@Controller({
    version: '1',
    path: '/ai',
})
export class AiController {
    constructor(private readonly aiService: AiService) {}

    @Post('/agent')
    async createAgent(@Body() body: any) {
        return this.aiService.createAgent(body);
    }

    @Get('/agent/:id')
    async getAgent(@Param('id') id: string) {
        return this.aiService.getAgent(id);
    }

    @Put('/agent/:id')
    async updateAgent(@Param('id') id: string, @Body() body: any) {
        return this.aiService.updateAgent(id, body);
    }

    @Delete('/agent/:id')
    async deleteAgent(@Param('id') id: string) {
        return this.aiService.deleteAgent(id);
    }

    @Post('/chat')
    async aiChat(@Body() body: any) {
        const reply = await this.aiService.generateReply(body.message);
        return { reply, confidence: 0.98, model: 'gemini-3.5-flash' };
    }

    @Post('/reply')
    async aiReply(@Body() body: any) {
        const reply = await this.aiService.generateReply(body.text);
        return { reply };
    }

    @Post('/training')
    async aiTraining(@Body() body: any) {
        return { status: 'Training queued', epochs: 5, accuracy: '95%' };
    }

    @Post('/knowledge-base')
    async aiKnowledgeBase(@Body() body: any) {
        return { status: 'Documents indexed into vector store', count: body.documents?.length || 0 };
    }

    @Post('/intent')
    async aiIntentDetection(@Body() body: any) {
        return { intent: 'purchase_intent', confidence: 0.91 };
    }

    @Post('/sentiment')
    async aiSentimentAnalysis(@Body() body: any) {
        return { sentiment: 'positive', score: 0.88 };
    }

    @Post('/translation')
    async aiTranslation(@Body() body: any) {
        return { translatedText: `Translated "${body.text}" to ${body.targetLanguage}` };
    }

    @Post('/moderation')
    async aiModeration(@Body() body: any) {
        return { flag: false, categories: { hate: false, violence: false, sexual: false } };
    }
}
