import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DomseguroPipe } from '../../pipes/domseguro.pipe';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [CommonModule, DomseguroPipe],
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent {
  constructor(public authService: AuthService, private sanitizer: DomSanitizer) {}

  video: string = '_Rh-VjB3ATk?si=F5bY1x1-CDYxayfB';

  get isAdmin(): boolean {
    return this.authService.isLoggedIn();
  }

  videos = [
    { src: 'assets/videos/video1.mp4', poster: 'assets/posters/preview1.png', protegido: false },
    { src: 'assets/videos/video2.mp4', poster: 'assets/posters/preview2.png', protegido: true },
    { src: 'assets/videos/video3.mp4', poster: 'assets/posters/preview3.png', protegido: false },
    { src: 'assets/videos/video4.mp4', poster: 'assets/posters/preview4.png', protegido: true },
    { src: 'assets/videos/video5.mp4', poster: 'assets/posters/preview5.png', protegido: true },
    { src: 'assets/videos/video6.mp4', poster: 'assets/posters/preview6.png', protegido: false }
  ];

  getVideoUrl(src: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(src);
  }

}
