import { Component, OnInit, ViewChild, ElementRef, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from '../../shared/services/http/http.service';
// import { SubjectService } from '../../shared/services/subjectService.service';
// import { HttpService } from 'src/app/shared/services/http';
// import { SubjectService } from 'src/app/shared/services/subjectService.service';

@Component({
	selector: 'naslist',
	templateUrl: './naslist.component.html',
	styleUrls: ['./naslist.component.css']
})

export class NasListComponent implements OnInit {
	
	// titles=["","设备绑定","姓名绑定"];
	// title;
	// id=1;
	userInfo = [];

	data = [];
	loading = true;
	me:any;

	page = 0;
	limit = 10;

	headImg = "./assets/images/default-touxiang.png";
	videoImg = "./assets/images/default-img.png";

	baseUrl = "";
	uid;

	keySearchSub:Subscription;
	keyWord;

    ngOnDestroy(): void {
        if (this.keySearchSub) {
            this.keySearchSub.unsubscribe();
        }
    }
	constructor(
		private route: ActivatedRoute,
		private http: HttpService,
		// private sub: SubjectService,
		private router: Router
	) {
		this.baseUrl = window["context"]["apiroot"];
		this.uid = window['context']['uid'];

		let keyword = window["context"]["keyWord"] || "";
		this.keyWord = keyword;
	}

	ngOnInit() {
		// this.id = +this.route.snapshot.data.id;
		// this.title = this.titles[this.id];

		// this.keySearchSub = this.sub.keyWordObservable.subscribe(
        //     () =>{
		// 		let keyword = window["context"]["keyWord"] || "";
		// 		this.keyWord = keyword;

		// 		this.page = 1;
        // 		this.data = [];
		// 		this.getSelectedCircle();
		// 	}
		// );

		this.getSelectUserInfo();
	}

	meetClick(item):void{
        // if(this.id==1){
        //     this.router.navigate(['/seatlist/code',{id:this.id,meetid:item.id}]);
        // }else{
        //     this.router.navigate(['/seatlist/name',{id:this.id,meetid:item.id}]);
        // }
	}

	videoClick(item):void{
		this.router.navigate(['/details/'+item.id]);
	}

	headerClick(item):void{
		if(this.uid == item.uid){
			//自己的视频，进入自己首页
			this.router.navigate(['/myauthor/main']);
		}else{
			this.router.navigate(['/author/main/'+item.uid+'/'+(+item.isAdmin)]);
		}
	}
	
	getSelectUserInfo():void{

		const params: Map<string, any> = new Map<string, any>();

		let url = "/jqkj/circleMine/getSelectUserInfo";
		this.http.get(url, params, null).subscribe(data => {
			// console.log(data)
			if(data.status == 0){
				this.userInfo = data.data || [];
				this.replaceHeadImg();
			}
			// this.loading = false;
		}, error => {
			console.error(error);
			// this.loading = false;
		});
	}

	replaceHeadImg(){
		if(this.data.length > 0 && this.userInfo.length > 0){
			this.userInfo.forEach(item=>{
				this.data.map(item2=>{
					return item2.uid == item.uid ? item2.headimgurl = item.headimgurl : item.headimgurl;
				})
			})
		}
	}

	getSelectedCircle():void{
		this.loading = true;
		const params: Map<string, any> = new Map<string, any>();
		

		let url = "/jqkj/cricle/getSelectedCircle";
		
		//判断关键字搜索
		if(this.keyWord){
			url = "/jqkj/cricle/search";
			params.set("title",this.keyWord);
			params.set("pageNum",this.page);
			params.set("limit",this.limit);
			params.set("circleUid",this.uid);
			params.set("type",0);
		}else{
			params.set("page",this.page);
			params.set("limit",this.limit);
		}

		this.http.get(url, params, null).subscribe(data => {
			if(data.code == 0){
				let list = data.data || [];

				this.data = this.data.concat(list);
				this.replaceHeadImg();
				
				if(list.length < this.limit){
					// 锁定
					this.me.lock();
					// 无数据
					this.me.noData(true);
				}
				
				setTimeout(()=>{
					this.me.resetload();
				},200);
			}

			this.loading = false;
		}, error => {
			console.error(error);
			this.loading = false;
		});
	}


	drapUp(me:any){
        console.log("drapUp-----");
        this.me = me;
        this.me.resetload();
        this.me.unlock();
		this.me.noData(false);
		
        this.page = 1;
        this.data = [];
        this.getSelectedCircle();
    }
    drapDown(me:any){
        console.log("drapDown------------");
        this.me = me;
        this.page++;
        this.getSelectedCircle();
	}
	
}
