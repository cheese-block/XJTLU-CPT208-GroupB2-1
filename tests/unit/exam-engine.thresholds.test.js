import { describe, expect, it } from 'vitest';
import { calculateGPA, calculateIeltsTag } from '../../src/engine/ExamEngine.js';

describe('ExamEngine threshold mapping', () => {
  it('maps GPA by inclusive lower bounds', () => {
    expect(calculateGPA(50)).toEqual({ gpa: 3.8, tag: 'GPA_Top' });
    expect(calculateGPA(49)).toEqual({ gpa: 3.3, tag: 'GPA_High' });
    expect(calculateGPA(38)).toEqual({ gpa: 3.3, tag: 'GPA_High' });
    expect(calculateGPA(37)).toEqual({ gpa: 2.8, tag: 'GPA_Mid' });
    expect(calculateGPA(24)).toEqual({ gpa: 2.8, tag: 'GPA_Mid' });
    expect(calculateGPA(23)).toEqual({ gpa: 2.2, tag: 'GPA_Low' });
  });

  it('maps IELTS by inclusive lower bounds', () => {
    expect(calculateIeltsTag(25)).toEqual({ tag: 'IELTS_7.5', band: '7.5' });
    expect(calculateIeltsTag(24)).toEqual({ tag: 'IELTS_7.0', band: '7.0' });
    expect(calculateIeltsTag(21)).toEqual({ tag: 'IELTS_7.0', band: '7.0' });
    expect(calculateIeltsTag(20)).toEqual({ tag: 'IELTS_6.5', band: '6.5' });
    expect(calculateIeltsTag(9)).toEqual({ tag: 'IELTS_6.0', band: '6.0' });
    expect(calculateIeltsTag(8)).toEqual({ tag: 'IELTS_5.5', band: '5.5' });
  });
});
