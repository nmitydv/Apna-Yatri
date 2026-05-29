import { Injectable, NotFoundException } from '@nestjs/common';
import { FormRepository } from '../repository/repositories/form.repository';
import { FormEntity, FormDoc } from '../repository/entities/form.entity';

@Injectable()
export class FormsService {
    constructor(private readonly formRepository: FormRepository) {}

    async createForm(data: any): Promise<FormDoc> {
        return this.formRepository.create({
            workspaceId: data.workspaceId,
            title: data.title,
            fields: data.fields || [],
            submissions: [],
            analytics: { views: '0', submissionsCount: '0' },
            isActive: true,
        });
    }

    async getForm(id: string): Promise<FormDoc> {
        const form = await this.formRepository.findOneById(id);
        if (!form) {
            throw new NotFoundException('Form not found');
        }
        return form;
    }

    async submitForm(id: string, submissionData: Record<string, string>): Promise<FormDoc> {
        const form = await this.getForm(id);
        form.submissions.push({ data: submissionData, submittedAt: new Date() });
        return form.save();
    }
}
