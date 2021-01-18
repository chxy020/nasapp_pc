import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs'
import { debounceTime } from 'rxjs/operators';
import { HttpService } from '../../../shared/services/http/http.service';
// import { SubjectService } from 'src/app/shared/services/subjectService.service';

@Component({
    selector: 'header-console',
    template: `
    <div class="login-bt">
        <div class="iconfont icon-zu102"></div>
        <div class="iconfont icon-zu100"></div>
        <div class="iconfont icon-zu99"></div>
    </div>
    `,
    styles: [``]
})


export class HeaderConsoleComponent implements OnInit {
    loading = true;

	headImg = "./assets/images/headimg.png";

	pageType = 1;

	baseUrl = "";
	uid;

    routeUrl;

    searchTermStream = new Subject(); 
    keySub:Subscription;
    
    // <li class="tabDivActive">精选</li>
    menus:Array<any> = [
        {id:1,name:"精选",current:false},
        {id:2,name:"关注",current:false},
        {id:3,name:"我的圈子",current:false}
    ];

    myuid;

    ngOnDestroy(): void {
        if (this.keySub) {
            this.keySub.unsubscribe();
        }
    }
    constructor(
        private route: ActivatedRoute,
        private http: HttpService,
        // private sub: SubjectService,
        private router: Router
    ) { 
        
        // console.log(this.router.url);

        this.menus.map((item)=>item.current=false);

        this.currentPage();

        // this.route.params.pipe(map).map(params => {
        //     return params['id'];
        // }).subscribe(id => {
        //     this.loadDB(id);
        // });

        // this.heroService.getHero(id)
        //   .subscribe(hero => this.hero = hero);
    }

    currentPage(){
        let url = this.router.url;
        if(url.indexOf("/main/choice") > -1){
            this.menus[0].current = true;
        }
        if(url.indexOf("/main/attention") > -1){
            this.menus[1].current = true;
        }
        if(url.indexOf("/main/oneself") > -1){
            if(this.menus.length > 2){
                // this.menus.push({id:3,name:"我的圈子",current:false});
                this.menus[2].current = true;
            }
            
        }
    }

    ngOnInit() {
        this.uid = window["context"]["uid"];
        this.routeUrl = this.router.url.toString();

        // this.keySub = this.searchTermStream.pipe(debounceTime(500)).subscribe((keyword) => {
        //         window["context"]["keyWord"] = keyword;
        //         this.sub.keyWordSub();
        //     }
        // );

        this.getMineNavigation();

        // let url = this.router.url;
        // if(url == '/meetlist/name'){
        //     this.id = 2;
        // }else{
        //     this.id = 1;
        // }
    }

    menuClick(item):void{
        this.menus.map((item)=>item.current=false);

        switch(item.id){
            case 1:
                this.menus[0].current = true;
                this.router.navigate(['/main/choice'],{queryParams:{uid:this.uid}});
            break;
            case 2:
                this.menus[1].current = true;
                this.router.navigate(['/main/attention/all']);
            break;
            case 3:
                this.menus[2].current = true;
                this.router.navigate(['/main/oneself/'+this.myuid]);
            break;
        }
        if(item.uid){
            item.current = true;
            this.router.navigate(['/main/circle/'+item.uid]);
        }
    }

    myAuthorClick(){
        // this.router.navigate(['/myauthor/main']);
        this.router.navigate(['/usercenter/main']);
    }

    getMineNavigation():void{
		this.loading = true;

		const params: Map<string, any> = new Map<string, any>();
		params.set("uid",this.uid);

		let url = "/jqkj/circleMine/getMineNavigation";
		this.http.get(url, params, null).subscribe(data => {
			if(data.status == 0){
                this.menus.map((item)=>item.current=false);
                let list = data.data || [];
                list.forEach((item,index)=>{
                    // console.log(index);
                    let path = this.routeUrl.indexOf('circle');
                    let cpath = this.routeUrl.substr(path);

                    if(index == 0){
                        // item.circleName = this.uid == item.uid ? "我的圈子" : item.circleName;
                        if(this.uid == item.uid){
                            this.myuid = item.uid;
                            // this.menus.push({id:3,name:"我的圈子",current:false});
                        }else{
                            this.myuid = item.uid;
                            this.menus.push({
                                "uid":item.uid,
                                "name":item.circleName,
                                "current":cpath == ('circle/'+item.uid) ? true : false
                            });
                        }
                    }else{
                        this.menus.push({
                            "uid":item.uid,
                            "name":item.circleName,
                            "current":cpath == ('circle/'+item.uid) ? true : false
                        });
                    }
                });

                this.currentPage();
				// this.menus = this.menus.concat(list);
			}
			this.loading = false;
		}, error => {
			console.error(error);
			this.loading = false;
		});
    }
    
    
    keyWordSearch(term:string) {
        this.searchTermStream.next(term); 
    }
    
    getLicense(): void {
      // this.http.post('/platform/authz/getList', null , this.ctx).subscribe(data => {
      //   if (data.code === 200) {
      //     this.license = data.data.licenseInfo;
      //   }
      // });
    }
}