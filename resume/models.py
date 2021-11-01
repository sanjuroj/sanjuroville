from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.


class Basics(models.Model):
    name = models.CharField(max_length=255)
    label = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    phone = PhoneNumberField(blank=True, null=True)
    website = models.CharField(max_length=255, blank=True)
    summary = models.TextField(blank=True)
    address1 = models.CharField(max_length=255, blank=True)
    address2 = models.CharField(max_length=255, blank=True)
    postalCode = models.CharField(verbose_name='post code', max_length=255, blank=True)
    city = models.CharField(max_length=255, blank=True)
    countryCode = models.CharField(max_length=255, blank=True)
    region = models.CharField(verbose_name='State/Province', max_length=255, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Basics"


class Profile(models.Model):
    network = models.CharField(max_length=255)
    username = models.CharField(max_length=255)
    url = models.CharField(max_length=255)

    def __str__(self):
        return self.network


class Job(models.Model):
    company = models.CharField(max_length=255)
    position = models.CharField(max_length=255)
    website = models.CharField(max_length=255, blank=True)
    startDate = models.DateField(max_length=255)
    startDatePrecision = models.CharField(max_length=1,
        choices=(('d', 'Day'), ('m', 'Month'), ('y', 'Year')))
    endDate = models.DateField(null=True, blank=True, max_length=255)
    endDatePrecision = models.CharField(null=True, blank=True, max_length=1,
        choices=(('d', 'Day'), ('m', 'Month'), ('y', 'Year')))
    summary = models.TextField(blank=True)
    location = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.company


class JobHighlight(models.Model):
    job = models.ForeignKey('Job', related_name='highlights', on_delete=models.CASCADE)
    highlight = models.TextField()

    def __str__(self):
        return self.highlight


class Volunteer(models.Model):
    organization = models.CharField(max_length=255)
    position = models.CharField(max_length=255)
    website = models.CharField(max_length=255, blank=True)
    startDate = models.DateField(max_length=255)
    startDatePrecision = models.CharField(max_length=1,
        choices=(('d', 'Day'), ('m', 'Month'), ('y', 'Year')))
    endDate = models.DateField(max_length=255)
    endDatePrecision = models.CharField(max_length=1,
        choices=(('d', 'Day'), ('m', 'Month'), ('y', 'Year')))
    summary = models.TextField(max_length=255, blank=True)
    location = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        verbose_name_plural = 'Volunteering'

    def __str__(self):
        return self.organization


class VolunteerHighlight(models.Model):
    volunteer = models.ForeignKey('Volunteer', related_name='highlights', on_delete=models.CASCADE)
    highlight = models.TextField()

    def __str__(self):
        return self.highlight


class Education(models.Model):
    institution = models.CharField(max_length=255)
    major = models.CharField(max_length=255, blank=True)
    degreeType = models.CharField(max_length=255)
    startDate = models.DateField(max_length=255)
    startDatePrecision = models.CharField(max_length=1,
        choices=(('d', 'Day'), ('m', 'Month'), ('y', 'Year')))
    endDate = models.DateField(max_length=255)
    endDatePrecision = models.CharField(max_length=1,
        choices=(('d', 'Day'), ('m', 'Month'), ('y', 'Year')))
    gpa = models.DecimalField(max_digits=4, decimal_places=3, blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        verbose_name_plural = "Education"

    def __str__(self):
        return self.institution


class EducationHighlight(models.Model):
    education = models.ForeignKey('Education', related_name='highlights', on_delete=models.CASCADE)
    highlight = models.TextField()

    def __str__(self):
        return self.highlight


class Course(models.Model):
    education = models.ForeignKey('Education', on_delete=models.CASCADE)
    course = models.CharField(max_length=255)

    def __str__(self):
        return self.course


class Award(models.Model):
    title = models.CharField(max_length=255)
    date = models.DateField(max_length=255)
    awarder = models.CharField(max_length=255)
    summary = models.TextField(max_length=255, blank=True)

    def __str__(self):
        return self.title


class Publication(models.Model):
    title = models.CharField(max_length=255)
    publisher = models.CharField(max_length=255)
    releaseDate = models.DateField(max_length=255)
    website = models.CharField(max_length=255, blank=True)
    summary = models.TextField(max_length=255, blank=True)
    doi = models.CharField(max_length=255, blank=True)

    def __str__(self):

        return self.title


class Skill(models.Model):
    name = models.CharField(max_length=255)
    level = models.CharField(max_length=255, blank=True)
    summary = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.name


class SkillKeyword(models.Model):
    skill = models.ForeignKey('Skill', on_delete=models.CASCADE)
    keyword = models.CharField(max_length=255)

    def __str__(self):
        return self.keyword


class Language(models.Model):
    name = models.CharField(max_length=255)
    level = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.name


class Interest(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class InterestKeyword(models.Model):
    interest = models.ForeignKey('Interest', on_delete=models.CASCADE)
    keyword = models.CharField(max_length=255)

    def __str__(self):
        return self.keyword


class Reference(models.Model):
    name = models.CharField(max_length=255)
    reference = models.CharField(max_length=255)

    def __str__(self):
        return self.name
