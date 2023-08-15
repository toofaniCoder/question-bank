module.exports = {
  async beforeUpdate({ params }) {
    try {
      if (params.data.publishedAt !== null) {
        const previousData = await strapi.entityService.findOne(
          "api::question.question",
          params.where.id
        );
        // console.log(previousData);
        const res = await strapi.plugins.email.services.email.send({
          to: previousData.email,
          toName: previousData.author,
          subject:
            "👋 Hey there! Sincere Thanks for Your Invaluable Contribution to Our Question Bank Website",
          html: `
              <h1>Dear ${previousData.author.toUpperCase()},</h1>
          <hr />
          <p>I hope this email finds you in great spirits. I am writing to extend my heartfelt gratitude for your recent contribution to our question bank website. Your effort in uploading the [Name of the Question Paper] has immensely enriched our platform and has a positive impact on countless students and educators.</p>
          <br />
          <p>Your dedication to sharing knowledge and resources has not gone unnoticed. We understand that creating and uploading content is a time-consuming endeavor, and we are genuinely grateful for your willingness to share your expertise with the community. Your commitment to education and the betterment of students' lives aligns perfectly with the mission we strive to achieve with our platform.</p>
          <br />
          <p>We deeply appreciate the time and effort you invested in ensuring the accuracy and quality of the uploaded question paper. Your attention to detail and commitment to excellence make your contributions even more valuable to us and our users.</p>
          <br />
          <p>Please know that your actions have a meaningful impact, and the positive ripple effect of your generosity will extend far beyond the digital realm. The support and encouragement we receive from contributors like you inspire us to continually improve our platform and strive for excellence.</p>
          <br />
          <p>
          Once again, thank you for your dedication and generosity in sharing your knowledge with us. Our question bank would not be the same without your valuable input. We look forward to future collaborations and more contributions from you, as we continue on our mission to create a vibrant and comprehensive learning community.</p>
          <p>If you have any suggestions or feedback, please feel free to share them with us. Your insights are always welcome and help us enhance the overall user experience.</p>
          <p>Thank you for being an essential part of our journey.</p>
          <p>With sincere appreciation,</p>
          <br />
          <br />
          <p>Subroto Biswas</p>
          <p>CEO</p>
          <p>questionbank.com</p>
          <p>+91 333-3333-333</p>`,
        });
        // console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  },
};
