import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

fdescribe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  const mockSocialLinks = [
    {
      name: 'Facebook',
      url: 'https://facebook.com/gusteaus',
      ariaLabel: 'Visit our Facebook page'
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/gusteaus',
      ariaLabel: 'Visit our Instagram page'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/gusteaus',
      ariaLabel: 'Visit our Twitter page'
    },
    {
      name: 'Tiktok',
      url: 'https://tiktok.com/@gusteaus',
      ariaLabel: 'Visit our Tiktok page'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FooterComponent 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    
    component.socialLinks = mockSocialLinks;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct menu structure', () => {
    const menu = fixture.nativeElement.querySelector('.footer__menu');
    const menuContent = fixture.nativeElement.querySelector('.footer__menu-content');
    const navigation = fixture.nativeElement.querySelector('.footer__navigation');
    
    expect(menu).toBeTruthy();
    expect(menuContent).toBeTruthy();
    expect(navigation).toBeTruthy();
  });

  it('should render correct number of social media links', () => {
    const menuItems = fixture.nativeElement.querySelectorAll('.menu__item');
    expect(menuItems.length).toBe(mockSocialLinks.length);
  });

  it('should display all social media names from input', () => {
    const spans = fixture.nativeElement.querySelectorAll('.menu__item span');
    
    spans.forEach((span: HTMLElement, index: number) => {
      expect(span.textContent).toBe(mockSocialLinks[index].name);
    });
  });


  it('should have correct URLs from input', () => {
    const links = fixture.nativeElement.querySelectorAll('.menu__item a');
    
    links.forEach((link: HTMLElement, index: number) => {
      expect(link.getAttribute('href')).toBe(mockSocialLinks[index].url);
    });
  });

  it('should update rendered links when input changes', () => {
    const newSocialLinks = [
      {
        name: 'LinkedIn',
        url: 'https://linkedin.com/company/gusteaus',
        ariaLabel: 'Visit our LinkedIn page'
      }
    ];

    component.socialLinks = newSocialLinks;
    fixture.detectChanges();

    const menuItems = fixture.nativeElement.querySelectorAll('.menu__item');
    const firstLink = menuItems[0].querySelector('a');
    const firstSpan = menuItems[0].querySelector('span');

    expect(menuItems.length).toBe(1);
    expect(firstSpan.textContent).toBe('LinkedIn');
    expect(firstLink.getAttribute('href')).toBe('https://linkedin.com/company/gusteaus');
    expect(firstLink.getAttribute('aria-label')).toBe('Visit our LinkedIn page');
  });


  it('should have correct CSS classes', () => {
    const menu = fixture.nativeElement.querySelector('menu');
    expect(menu.classList.contains('menu')).toBeTrue();
    expect(menu.classList.contains('footer__menu')).toBeTrue();
    expect(menu.classList.contains('footer')).toBeTrue();
  });

  it('should have proper list structure', () => {
    const ul = fixture.nativeElement.querySelector('ul');
    const listItems = ul.querySelectorAll('li');
    
    expect(ul.classList.contains('footer__navigation')).toBeTrue();
    expect(listItems.length).toBe(mockSocialLinks.length);
    listItems.forEach((item: HTMLElement) => {
      expect(item.classList.contains('menu__item')).toBeTrue();
    });
  });

  it('should render each social link correctly', () => {
    mockSocialLinks.forEach((socialLink, index) => {
      const linkElement = fixture.nativeElement.querySelector(`.menu__item:nth-child(${index + 1}) a`);
      const spanElement = linkElement.querySelector('span');

      expect(linkElement.getAttribute('href')).toBe(socialLink.url);
      expect(linkElement.getAttribute('aria-label')).toBe(socialLink.ariaLabel);
      expect(spanElement.textContent).toBe(socialLink.name);
    });
  });
});