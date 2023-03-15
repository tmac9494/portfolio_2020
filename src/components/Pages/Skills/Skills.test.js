import { skills, getSkillsByCompany, resumeData} from '../../../utils';

// get skills by company --RESUME
test('Expect skills for each company', () => {
    const companyIDs = resumeData.jobs.map(company => company.id);
    companyIDs.forEach(id => {
        expect(getSkillsByCompany(id).length).toBeGreaterThan(0);
    })
})


// confirm all skills-data.json ids are valid with enum