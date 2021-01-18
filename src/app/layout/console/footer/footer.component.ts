// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';

// @Component({
//     selector: 'footer-console',
//     template: `
//     <div class="h5_foot_box">
//       <ul class="h5_foot_nav">
//           <li (click)="changeType(1)" class="shebei " [class.curr]="id==1" >
//               <a href="javascript:;">
//                   <span class="img"></span>
//               </a>
//           </li>
//           <li (click)="changeType(2)" class="zuoyi" [class.curr]="id==2" >
//               <a href="javascript:;">
//                   <span class="img"></span>
//               </a>
//           </li>
//       </ul>
//     </div>
//     `,
//     styles: [``]
// })


// export class FooterConsoleComponent implements OnInit {
//     ctx: string;

//     id=1;

//     constructor(
//         private route: ActivatedRoute,
//         private router: Router
//     ) { 
        

//         // this.route.params.pipe(map).map(params => {
//         //     return params['id'];
//         // }).subscribe(id => {
//         //     this.loadDB(id);
//         // });

//         // this.heroService.getHero(id)
//         //   .subscribe(hero => this.hero = hero);
//     }

//     ngOnInit() {
//         let url = this.router.url;
//         if(url == '/meetlist/name'){
//             this.id = 2;
//         }else{
//             this.id = 1;
//         }
//     }

//     changeType(i):void{
//         this.id = i;
//         if(i==1){
//             this.router.navigate(['/meetlist/code']);
//         }else{
//             this.router.navigate(['/meetlist/name']);
//         }
//     }

//     getLicense(): void {
//       // this.http.post('/platform/authz/getList', null , this.ctx).subscribe(data => {
//       //   if (data.code === 200) {
//       //     this.license = data.data.licenseInfo;
//       //   }
//       // });
//     }
// }
